/**
 * Created by Chen on 2016-12-11.
 */

'use strict';

let AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

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
        console.error("Unable to get userIds. Error JSON:", JSON.stringify(err));
        return reject(err);
      } else {
        // console.log("Get user ids successfully", data);
        let userIds = data.Item.usersIds.values,
            candidateIds = userIds.filter(id => id !== userId);
        // console.log("candidateIds", candidateIds);
        console.log("Get all users ID successfully.");
        // console.log("userId", userId);
        // console.log("candidateIds", candidateIds);
        resolve({candidateIds, userId});
      }
    });
  });
};

const pickFollowerIds = (data) => {
  let candidateIds = data.candidateIds,
      userId = data.userId;
  
  let followNumber = Math.min(99, candidateIds.length);
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
  return {pickedIds, userId};
};

const followAndStore = (data) => {
  let pickedIds = data.pickedIds,
      userId = data.userId;
  //promise -> send PUT request to follow -> add in "Friends" Table
  let promises = [];
  pickedIds.forEach(pickedId => {
    // pushSinglePromise(pickedId, userId);
    // const followUser = () => {};
    //
    // const storeFriendship = () => {};
    //
    // promises.push(followUser().then(storeFriendship));
  });
  
  return Promise.all(promises)
};

module.exports = (event, context, callback) => {
  // console.log("DynamoDB triggered lambda successfully");
  // console.log("event", JSON.stringify(event));
  // console.log("context", context);
  
  let data = event.Records[0],
      item = data.dynamodb,
      userId = item.Keys.id.S,
      eventName = data.eventName;
  
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
  console.log("userId", userId);
  console.log("eventName", eventName);
  
  getAllUserIds(userId)
      .then(pickFollowerIds)//returns userIds
      .then(followAndStore)//
      .then(() => {
        console.log("Follow user task is accomplished");
        response.body = {message: "Users have followed each other successfully"};
        return callback(null, response);
      })//follow task is accomplished;
      .catch((err) => {
        console.log("err", err);
        callback(new Error("Error found:", err));
      });
};