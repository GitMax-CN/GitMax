/**
 * Created by Chen on 2016-12-11.
 */

'use strict';

let AWS = require("aws-sdk");

// AWS.config.update({
//   region: "us-west-2",
//   endpoint: "http://localhost:8000"
// });

let request = require('request');
let docClient = new AWS.DynamoDB.DocumentClient();

/**
 * Get all users' ids from Table UserIds
 * @param {string} userId
 * @returns {Promise}
 */
const getAllUserIds = (userId) => {
  return new Promise((resolve, reject) => {
    let params = {
      TableName: "UserIds",
      Key: {
        id: "allIds"
      },
    };
    // docClient.get()
    docClient.get(params, (err, data) => {
      if (err) {
        console.error("Unable to get userIds. Error JSON:", JSON.stringify(err), err.stack);
        return reject(err);
      } else {
        // console.log("Get user ids successfully", data);
        let userIds = data.Item.usersIds.values,
            candidateIds = userIds.filter(id => id !== userId);
        // console.log("candidateIds", candidateIds);
        console.log("Get all users ID successfully.");
        // console.log("userId", userId);
        // console.log("candidateIds", candidateIds);
        resolve(candidateIds);
      }
    });
  });
};

const pickFollowerIds = (candidateIds, userId, followNumber) => {
  followNumber = Math.min(followNumber, candidateIds.length);
  console.log("userId", userId);
  console.log("candidateIds", candidateIds);
  for (let i = 0; i < followNumber; i++) {// Todo use followerNumber rather than
    // hardcoded value
    let index = Math.floor(Math.random() * candidateIds.length);
    
    //Swap the two elements
    let temp = candidateIds[i];
    candidateIds[i] = candidateIds[index];
    candidateIds[index] = temp;
  }
  let pickedIds = candidateIds.slice(0, followNumber);
  console.log("Picked ids successfully", pickedIds);
  return pickedIds;
};

const getPickedUsers = (pickedIds) => {
  let promises = pickedIds.map(id => {
    return new Promise((resolve, reject) => {
      let params = {
        TableName: "Users",
        Key: {
          id: id
        },
        ProjectionExpression: "id, login, avatar_url, followNumber, html_url, #name, #token",
        ExpressionAttributeNames: {
          "#name": "name",
          "#token": "token"
        },
      };
      docClient.get(params, (err, data) => {
        if (err) {
          console.error("Unable to get item. Error JSON:", JSON.stringify(err), err.stack);
          return reject(err);
        }
        let item = data.Item;
        // console.log("GetItem succeeded:", JSON.stringify(item));
        resolve(item);
      });
    });
  });
  
  return Promise.all(promises)
      .then((users) => {
        console.log("Fetched all users successfully");
        // console.log("users", users);
        return users;
      });
};

const followAndStore = (users, user) => {
  // console.log("fetched users", users);
  // console.log("original user", user);
  //promise -> send PUT request to follow -> add in "Friends" Table
  let promises = [];
  
  const followUser = (token, username) => {
    return new Promise((resolve, reject) => {
      let options = {
        url: "https://api.github.com/user/following/" + username + "?access_token=" + token,
        method: "put",
        headers: {
          'User-Agent': "GitMax"
        }
      };
      
      request(options, (error, response, body) => {
        if (error) {
          console.error("error following user " + username, error, error.stack);
          return reject(error);
        }
        // console.log("Successfully added")
        resolve();
      });
    })
  };
  
  const storeFriendship = (user1, user2) => {
    // console.log("user1.id", user1.id, "user1.name", user1.name, "user1.login", user1.login,
    //     "user1.html_url", user1.html_url, "user2.id", user2.id, "user2.name", user2.name,
    //     "user2.login", user2.login, "user2.html_url", user2.html_url);
    return new Promise((resolve, reject) => {
      let item = {
        "userId": user1.id,
        "username": user1.name,
        "userLogin": user1.login,
        "userUrl": user1.html_url,
        "userAvatarUrl": user1.avatar_url,
        "friendId": user2.id,
        "friendName": user2.name,
        "friendLogin": user2.login,
        "friendUrl": user2.html_url,
        "friendAvatarUrl": user2.avatar_url,
      };
      let params = {
        TableName: "Friends",
        Item: item,
      };
      docClient.put(params, (err, data) => {
        if (err) {
          console.error("Unable to add friendship to friends Table. ", JSON.stringify(err),
              err.stack);
          return reject(err);
        } else {
          // console.log("Friendship added successfully");
          resolve(item);
        }
      });
    });
  };
  
  users.forEach(userX => {
    // console.log("userX", userX);
    // console.log("user", user);
    promises.push(
        followUser(userX.token, user.login)
            .then(() => storeFriendship(userX, user))
    );
    promises.push(
        followUser(user.token, userX.login)
            .then(() => storeFriendship(user, userX))
    );
  });
  
  return Promise.all(promises);
};

module.exports = (event, context, callback) => {
  // console.log("DynamoDB triggered lambda successfully");
  // console.log("event", JSON.stringify(event));
  // console.log("context", context);
  
  let data = event.Records[0],
      item = data.dynamodb,
      userDraft = Object.assign({id: item.Keys.id.S}, item.NewImage),
      eventName = data.eventName,
      user = {};
  
  // Clean user attribute
  Object.keys(userDraft).forEach(key => {
    let attribute = userDraft[key];
    let value = attribute[Object.keys(attribute)[0]];
    // console.log("Object.keys(attribute)[0]", Object.keys(attribute)[0]);
    // console.log("Object.keys(attribute)[0]", Object.keys(attribute)[0]);
    // console.log('attribute[Object.keys(attribute)[0]]', attribute[Object.keys(attribute)[0]]);
    user[key] = value;
  });
  
  let response = {
    statusCode: 200,
    headers: {"Access-Control-Allow-Origin": "*"},
  };
  
  if (eventName !== "INSERT") {
    console.log("DynamoDB not insertion, quiting Lambda");
    response.body = {message: "DynamoDB update is not insertion, stop following users"};
    callback(null, response);
    return;
  }
  
  // console.log("data", data);
  // console.log("item", item);
  // console.log("user", user);
  // console.log("userId", userId);
  // console.log("eventName", eventName);
  
  getAllUserIds(user.id)
      .then(candidateIds => pickFollowerIds(candidateIds, user.id,
          user.followNumber))//returns userIds
      .then(getPickedUsers)// get all users
      .then(users => followAndStore(users, user))
      .then((friendships) => {
        // console.log("friendships", friendships);
        console.log("Follow user task is accomplished");
        response.body = {message: "Users have followed each other successfully"};
        return callback(null, response);
      })//follow task is accomplished;
      .catch((err) => {
        console.error("err", err, err.stack);
        callback(new Error("Error found:", err));
      });
};