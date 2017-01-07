/**
 * Created by Chen on 2016-12-11.
 */

'use strict';

let AWS = require("aws-sdk");

/*AWS.config.update({
 region: "us-west-2",
 endpoint: "http://localhost:8000"
 });*/

let docClient = new AWS.DynamoDB.DocumentClient();
let request = require('request');

/**
 * @param token
 * @returns {Promise.<obj>} Promise of user
 */
const getGitUser = (token) => {
  // console.log("getUserInfo start - token", token);
  let options = {
    url: "https://api.github.com/user?access_token=" + token,
    method: "get",
    headers: {
      'User-Agent': "GitMax"
    }
  };
  
  function removeEmptyAttr(getData) {
    return Object.keys(getData).reduce((user, key) => {
      let newUser = user;
      if (typeof getData[key]==="number" || (getData[key] && (typeof getData[key] !== "string" || getData[key].length !==0))){
        newUser[key] = getData[key];
      }
      return newUser;
    }, {});
  }
  
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        return reject(error);
      }
      let getData = JSON.parse(body);
      // console.log("response", response);
      // console.log("data", data);
      // console.log("getData", getData);
      //DynamoDB不能包含任何empty attributes
      let userWithNoEmptyAttributes = removeEmptyAttr(getData);
      userWithNoEmptyAttributes.token = token;
      
      resolve(userWithNoEmptyAttributes);
    });
  });
};

const getGitRepoStarCount = (gitUser) => {
  let options = {
    url: "https://api.github.com/user/repos?access_token=" + gitUser.token,
    method: "get",
    headers: {
      'User-Agent': "GitMax"
    }
  };
  
  function getStarCount(reposData){
    return reposData.reduce((starCount, repo) => starCount + repo.stargazers_count, 0);
  }
  
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        return reject(error);
      }
      // console.log("response", response);
      // console.log("data", data);
      // console.log("getData", getData);
      let reposData = JSON.parse(body);
      let totalStars = getStarCount(reposData);
      
      resolve(Object.assign({}, gitUser, {totalStars}));
    });
  });
};

const getDbUser = (userId) => {
  let params = {
    TableName: "Users",
    Key: {
      id: userId
    },
  };
  
  return new Promise((resolve, reject) => {
    docClient.get(params, (err, data) => {
      if (err) {
        console.error("Unable to get item. Error JSON:", JSON.stringify(err), err.stack);
        return reject(err);
      }
      let user = data.Item;
      console.log("user", user);
      if (!user) user = {};
      if (!user.max_created_at) user.max_created_at = new Date().getTime();
      // console.log("GetItem succeeded:", JSON.stringify(item));
      resolve(user);
    });
  });
};

const checkIdExist = (userId) => {
  return new Promise((resolve, reject) => {
    let params = {
      TableName: "Users",
      Key: {
        id: userId
      },
      ProjectionExpression: "login"
    };
    docClient.get(params, (err, data) => {
      if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err), err.stack);
        return reject(err);
      } else {
        console.log("GetItem succeeded:", JSON.stringify(data));
        resolve(data);
      }
    });
  });
};

const updateIdsInDB = (gitUser) => {
  // console.log("gitUser.id", gitUser.id);
  return new Promise((resolve, reject) => {
    let params = {
      TableName: "UserIds",
      Key: {
        "id": "allIds"
      },
      UpdateExpression: "ADD usersIds :newId",
      ExpressionAttributeValues: {
        ":newId": docClient.createSet([gitUser.id])
      },
      ReturnValues: "UPDATED_NEW"
    };
    
    docClient.update(params, (err, data) => {
      if (err) {
        console.error("Unable to update userIds. Error JSON:", JSON.stringify(err));
        return reject(err);
      }
      console.log("Updated userIds successfully:");
      resolve(gitUser);
    });
  });
};

const upsertUser = (fullUser) => {
  // console.log("fullUser is ready to be stored", fullUser);
  return new Promise((resolve, reject) => {
    let params = {
      TableName: "Users",
      Item: fullUser,
    };
    docClient.put(params, (err, data) => {
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err), err.stack);
        return reject(err);
      } else {
        console.log("User added successfully");
        resolve(fullUser);
      }
    });
  })
};

const handleGitUpsert = (event, context, callback) => {
  let data = JSON.parse(event.body);
  console.log("input data", JSON.stringify(data));
  if (!data.token) {
    callback(new Error("Data format error: token is required."));
    return;
  }
  
  let response = {
    statusCode: 200,
    headers: {"Access-Control-Allow-Origin": "*"},
  };
  
  let gitUser;
  getGitUser(data.token)
      .then(getGitRepoStarCount)
      .then(user => {
        gitUser = user;
        return user.id;
      })
      .then(getDbUser)
      .then(dbUser => upsertUser(merge(gitUser, dbUser)))
      .then((mergedUser) => {
        response.body = JSON.stringify({user: mergedUser});
        callback(null, response);
      })
      .catch((err) => {
        console.log("err", err);
        callback(new Error("Error found:", err));
      });
  
  function merge(gitUser, dbUser) {
    return Object.assign({}, dbUser, gitUser);
  }
};

function handleConfUpdate(event, context, callback) {
  let data = JSON.parse(event.body);
  console.log("input data", JSON.stringify(data));
  if (!data.user) {
    callback(new Error("Data format error: not found `user`."));
    return;
  }
  let response = {
    statusCode: 200,
    headers: {"Access-Control-Allow-Origin": "*"},
  };
  upsertUser(data.user)
      .then((user) => {
        response.body = JSON.stringify({user: user});
        callback(null, response);
      })
      .catch((err) => {
        console.log("err", err);
        callback(new Error("Error found:", err));
      });
}

const main = (event, context, callback) => {
  // console.log("event", event);
  // console.log("context", event);
  // console.log("event.path visited:", event.path);
  switch (event.path) {
    case "/user/gitUpsert":
      handleGitUpsert(event, context, callback);
      break;
    case "/user/confUpdate":
      handleConfUpdate(event, context, callback);
      break;
  }
};

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports = main;
