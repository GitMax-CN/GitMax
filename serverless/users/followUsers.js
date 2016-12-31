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

const randPickFollowers = (validCandis, followNumber) => {
  followNumber = Math.min(followNumber, validCandis.length);
  // console.log("userId", userId);
  // console.log("candidateIds", candidateIds);
  for (let i = 0; i < followNumber; i++) {
    // hardcoded value
    let index = Math.floor(Math.random() * validCandis.length);
    
    //Swap the two elements
    let temp = validCandis[i];
    validCandis[i] = validCandis[index];
    validCandis[index] = temp;
  }
  let pickedUsers = validCandis.slice(0, followNumber);
  console.log("Picked ids successfully", JSON.stringify(pickedUsers));
  throw new Error("manual break");
  return pickedUsers;
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

const getFriends = (userId) => {
  console.log("getFriends start with id", userId);
  const params = {
    TableName : "Friends",
    KeyConditionExpression: "#userId = :id",
    ExpressionAttributeNames:{
      "#userId": "userId"
    },
    ExpressionAttributeValues: {
      ":id": userId
    }
  };
  return new Promise((resolve, reject) => {
    docClient.query(params, (err, data) => {
      if (err) {
        console.error("Unable to get friends. Error JSON:", JSON.stringify(err), err.stack);
        return reject(err);
      } else {
        console.log("Query succeeded.", JSON.stringify(data));//Todo, comment data
        let friends = data.Items;
        resolve(friends);
      }
    });
  });
};

const getCandisByScan = (user) => {
  const params = { // 找到与用户互相欣赏的人，作为好友candidate
    TableName: "Users",
    ProjectionExpression: "#id, avatar_url, followers, following, login, #name, #token," +
    " addFollowersMax, crit_FollowersCount, crit_StargazersCount, totalStars",
    FilterExpression: "totalStars >= :user_star_crit AND followers >= :user_follower_crit AND" +
    " crit_StargazersCount <= :user_star AND crit_FollowersCount <= :user_follower",
    ExpressionAttributeNames: {
      "#id": "id",
      "#name": "name",
      "#token": "token",
    },
    ExpressionAttributeValues: {
      ":user_star_crit": user.crit_StargazersCount,
      ":user_follower_crit": user.crit_FollowersCount,
      ":user_star": user.totalStars,
      ":user_follower": user.followers,
    }
  };
  
  return new Promise((resolve, reject) => {
    docClient.scan(params, (err, data)=>{
      if (err) {
        console.error("Unable to get item. Error JSON:", JSON.stringify(err), err.stack);
        return reject(err);
      } else {
        console.log("Scan succeeded.", JSON.stringify(data));//Todo, comment data
        let candidates = data.Items;
        resolve(candidates);
      }
    });
  });
};

const removeAddedCandis = (candidates, friends, userId) => {
  let set = new Set();
  friends.forEach(obj => set.add(obj.friendId));// Add all friends' Ids in a set
  set.add(userId); // Remove the user from valid candidates
  
  let validCandis = [];
  candidates.forEach((candidate) => {
    if (!set.has(candidate.id)) validCandis.push(candidate);
  });
  return validCandis;
};

const removeFullFriendsCandidates = (candidates) => {
  let validCandis = [];
  candidates.forEach(candi => {
    if (candi.addFollowersMax > candi.followers) validCandis.push(candi);
  });
  return validCandis;
};

const doFollowUsers = () => {
  //Todo call confUpdate for adding property lastTimeFollow: new Date().getTime()
};

module.exports = (event, context, callback) => {
  // console.log("DynamoDB triggered lambda successfully");
  // console.log("event", JSON.stringify(event));
  // console.log("context", context);
  
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
  
  let user = data.user;
  let friends;
  getFriends(user.id)//获得所有好友的ids
      .then(friendsList => friends = friendsList)
      .then(() => getCandisByScan(user))//scan+filterExpression获得所有符合filter的用户，只传递回，login, id, 4个crits
      .then((candidates) => removeAddedCandis(candidates, friends, user.id)) //去除已经是好友的人
      .then((candidates) => removeFullFriendsCandidates(candidates)) //去除超过上限的人
      .then((validCandis) => randPickFollowers(validCandis, user.addFollowersNow))//从validCandis中调出xx个
      .then((foUsers) => doFollowUsers(foUsers, user)) //开始用户互相follow
      .then((newFriends) => {
        // console.log("friendships", friendships);
        console.log("Follow user task is accomplished");
        response.body = {message: "Users have followed each other successfully", newFriends};
        return callback(null, response);
      })//follow task is accomplished;
      .catch((err) => {
        console.error("err", err, err.stack);
        callback(new Error("Error found:", err));
      });
  
  // getAllUserIds(user.id)
  //     .then(candidateIds => pickFollowerIds(candidateIds, user.id,
  //         user.followNumber))//returns userIds
  //     .then(getPickedUsers)// get all users
  //     .then(users => followAndStore(users, user))
  //     .then((friendships) => {
  //       // console.log("friendships", friendships);
  //       console.log("Follow user task is accomplished");
  //       response.body = {message: "Users have followed each other successfully"};
  //       return callback(null, response);
  //     })//follow task is accomplished;
  //     .catch((err) => {
  //       console.error("err", err, err.stack);
  //       callback(new Error("Error found:", err));
  //     });
};

/*
 * getCandisByScan([filters]) - scan+filterExpression获得所有符合filter的用户，只传递4个crits，login, id,
 * removeHighCritCandis(foCandis, user) 去除candidates里，条件超过user的
 getFollowUsers(foCandis, pickNmber) - 从候选人中，随机选出 {Math.max(addFollowersNow, userFriends.length) - unfoUsers.length}，
 doFollowUsers(foUsers, user) 让用户和需要follow的User互相follow
 return foUsers
 * */