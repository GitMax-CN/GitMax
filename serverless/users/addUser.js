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

const getUserInfo = (token, email, id, followNumber) => {
  // console.log("getUserInfo start - token", token);
  return new Promise((resolve, reject) => {
    let options = {
      url: "https://api.github.com/user?access_token=" + token,
      method: "get",
      headers: {
        'User-Agent': "GitMax"
      }
    };

    request(options, (error, response, body) => {
      if (error) {
        return reject(error);
      }
      let getData = JSON.parse(body);
      // console.log("response", response);
      // console.log("data", data);
      // console.log("getData", getData);
      let user = Object.assign({}, getData,
          {"token": token, "email": email, "id": id, "followNumber": followNumber});
  
      Object.keys(user).forEach(key => {// Dela with empty attributes
        if (user[key] === null ||
            (typeof user[key] === "string" && user[key].length === 0)) user[key] = "N/A";
      });
      // console.log("typeof user.follower", typeof user.follower);
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

const updateIdsInDB = (fullUser) => {
  // console.log("fullUser.id", fullUser.id);
  return new Promise((resolve, reject) => {
    let params = {
      TableName: "UserIds",
      Key: {
        "id": "allIds"
      },
      UpdateExpression: "ADD usersIds :newId",
      ExpressionAttributeValues: {
        ":newId": docClient.createSet([fullUser.id])
      },
      ReturnValues: "UPDATED_NEW"
    };
    
    docClient.update(params, (err, data) => {
      if (err) {
        console.error("Unable to update userIds. Error JSON:", JSON.stringify(err));
        return reject(err);
      }
      console.log("Updated userIds successfully:");
      resolve(fullUser);
    });
  });
};

const storeItemToDB = (fullUser) => {
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

const main = (event, context, callback) => {
  let data = JSON.parse(event.body);
  console.log("input data", JSON.stringify(data));
  if (!data.id || !data.token) {
    callback(new Error("Data format error: id and token are required."));
    return;
  }
  
  const response = {
    statusCode: 200,
    headers: {"Access-Control-Allow-Origin": "*"},
  };
  
  checkIdExist(data.id)
      .then((user) => {
        let isUserExist = !isEmpty(user);
        if (isUserExist) {
          console.log("Not a new user, don't need to be stored");
          response.body = JSON.stringify({message: "Not a new user, don't need to be stored"});
          callback(null, response);
        }
        else {
          return getUserInfo(data.token, data.email, data.id, data.followNumber ? data.followNumber : 99)
              .then(updateIdsInDB)
              .then(storeItemToDB)
              .then((storedUser) => {
                response.body = JSON.stringify({storedUser});
                callback(null, response);
              });
        }
      })
      .catch((err) => {
        console.log("err", err);
        callback(new Error("Error found:", err));
      })
};

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports = main;