/**
 * Created by Chen on 2016-12-11.
 */

'use strict';

let AWS = require("aws-sdk");
const config = require('../config');
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

const randPickFollowers = (validCandis, followNum) => {
  const followNumber = Math.min(followNum, validCandis.length);
  console.log(`start to pick ${followNumber} followers`);
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
  // console.log("picked friends successfully", JSON.stringify(pickedUsers));
  console.log("Picked users successfully"/*, JSON.stringify(pickedUsers)*/);
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

const updateFollowedUsers = (foUsers) => {
  // console.log("to be followed friends", JSON.stringify(foUsers));
  
  let promises = foUsers.map(friend => {
    const params = {
      TableName:"Users",
      Key:{
        "id": friend.id,
      },
      UpdateExpression: "set maxFriendCount = :newMaxFriendCount",
      ExpressionAttributeValues:{
        ":newMaxFriendCount":friend.maxFriendCount + 1,
      },
      ReturnValues:"UPDATED_NEW"
    };
    return new Promise((resolve, reject) => {
      docClient.update(params, (err, data) => {
        if (err) {
          console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
          reject(err);
        } else {
          // console.log("UpdateItem succeeded:", JSON.stringify(data));
          resolve(data);
        }
      })
    });
  });
  
  return Promise.all(promises)
      .then(result => {
        // console.log(JSON.stringify(result));
        return foUsers;
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
      if (user2.bio) item["friendBio"] = user2.bio;
      if (user2.company) item["friendCompany"] = user2.company;
      if (user2.followers) item["friendFollowers"] = user2.followers;
      if (user2.totalStars) item["friendTotalStars"] = user2.totalStars;
      if (user2.location) item["friendLocation"] = user2.location;
      if (user2.email) item["friendEmail"] = user2.email;
      if (user2.created_at) item["friendCreated_at"] = user2.created_at;
      
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
            .then(() => userX)
    );
    promises.push(
        followUser(user.token, userX.login)
            .then(() => storeFriendship(user, userX))
            .then(() => null) //users only need to be added once
    );
  });
  
  function getNeededProps(friend) {
    return {
      id: friend.id,
      url: friend.url,
      avatar_url: friend.avatar_url,
      login: friend.login,
      name: friend.name,
      created_at: friend.created_at,
    }
  }
  
  return Promise.all(promises)
      .then((result) => {
        console.log("storeFriendship finished"/*, result*/);
        let addedFriends = [];
        result.forEach(friend => friend && addedFriends.push(getNeededProps(friend)));
        return (addedFriends);
      });
};

const getFriends = (userId) => {
  console.log("getFriends start for user id", userId);
  const params = {
    TableName: "Friends",
    KeyConditionExpression: "#userId = :id",
    ExpressionAttributeNames: {
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
        // console.log("Get current friends succeeded.", JSON.stringify(data));
        console.log("Query succeeded."/*, JSON.stringify(data)*/);
        let friends = data.Items;
        resolve(friends);
      }
    });
  });
};

const getCandisByScan = (user) => {
  const params = { // 找到与用户互相欣赏的人，作为好友candidate
    TableName: "Users",
    ProjectionExpression: "#id, #url, created_at, avatar_url, followers, following, login, #name," +
    " #token, addFollowersMax, crit_FollowersCount, crit_StargazersCount, totalStars, maxFriendCount",
    FilterExpression: "totalStars >= :user_star_crit AND followers >= :user_follower_crit AND" +
    " crit_StargazersCount <= :user_star AND crit_FollowersCount <= :user_follower",
    ExpressionAttributeNames: {
      "#id": "id",
      "#url": "url",
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
    docClient.scan(params, (err, data) => {
      if (err) {
        console.error("Unable to get item. Error JSON:", JSON.stringify(err), err.stack);
        return reject(err);
      } else {
        // console.log("Get all candidates succeeded.", JSON.stringify(data));//Todo, comment data
        console.log(`Scan succeeded, ${data.Items.length} items obtained`);
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
  // console.log("removeAddedCandis, valid candidates left", validCandis);
  console.log(`removeAddedCandis, ${validCandis.length} valid candidates left`);
  return validCandis;
};

const removeFullFriendsCandidates = (candidates) => {
  let validCandis = [];
  candidates.forEach(candi => {
    if (candi.addFollowersMax > ~~candi.maxFriendCount) validCandis.push(candi);
  });
  console.log(`removeFullFriendsCandidates, ${validCandis.length} valid candidates left`);
  return validCandis;
};

const configUpdate = (user, stage, newFriendCount) => {
  // const stage = event.requestContext.stage;
  // const stage = config.getStage();
  user.followedFriendsAt = new Date().getTime();
  user.maxFriendCount = ~~user.maxFriendCount + newFriendCount;//If undefined, user.maxFriendCount=0
  const url = config.lambda[stage].configUpdateEndpoint;
  
  let options = {
    url: url,
    method: "POST",
    body: JSON.stringify({user: user}),
  };
  
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        return reject(error);
      }
      let newUser = JSON.parse(body).user;
      // console.log("response", response);
      // console.log("data", data);
      // console.log("Update followedAt, user:", newUser);
      //DynamoDB不能包含任何empty attributes
      resolve(newUser);
    });
  });
};

const handleFollow = (event, context, callback) => {
  console.log("handleFollow start");
  // console.log("DynamoDB triggered lambda successfully");
  // console.log("event", JSON.stringify(event));
  // console.log("context", context);
  
  let data = JSON.parse(event.body);
  console.log("input data", JSON.stringify(data));
  if (!data.user) {
    callback(new Error("Data format error: not found `user`."));
    return;
  }
  
  let user = data.user;
  let friends;
  let newFriendsList;
  getFriends(user.id)//获得所有好友的ids
      .then(friendsList => friends = friendsList)
      .then(
          () => getCandisByScan(user))//scan+filterExpression获得所有符合filter的用户，只传递回一部分属性
      .then((candidates) => removeAddedCandis(candidates, friends, user.id)) //去除已经是好友的人
      .then((candidates) => removeFullFriendsCandidates(candidates)) //去除超过上限的人
      .then((validCandis) => randPickFollowers(validCandis, Math.min(12, (user.addFollowersMax - ~~user.maxFriendCount))))//从validCandis中调出12个
      // .then((validCandis) => randPickFollowers(validCandis, user.addFollowersNow))//从validCandis中调出xx个
      .then((foUsers) => updateFollowedUsers(foUsers))//更新被follow用户的maxFriendCount
      .then((foUsers) => followAndStore(foUsers, user)) //开始用户互相follow
      .then((newFriends) => newFriendsList = newFriends)
      .then(() => {
        if (newFriendsList.length > 0) return configUpdate(user, event.requestContext.stage, newFriendsList.length);
        else return user;
      })
      .then((newUser) => {
        // console.log("newFriends", newFriends);
        let response = {
          statusCode: 200,
          headers: {"Access-Control-Allow-Origin": "*"},
        };
        console.log("Follow user task is accomplished");
        response.body = JSON.stringify({newFriends: newFriendsList, user: newUser});
        callback(null, response);
      })//follow task is accomplished;
      .catch((err) => {
        console.error("err", err, err.stack);
        callback(new Error("Error found:", err));
      });
};

const handleGetFollowers = (event, context, callback) => {
  console.log("handleGetFollowers start");
  let data = JSON.parse(event.body);
  console.log("input data", JSON.stringify(data));
  if (!data.user) {
    callback(new Error("Data format error: not found `user`."));
    return;
  }
  
  let user = data.user;
  
  getFriends(user.id)//获得所有好友的ids
      .then(friendsList => {
        let TruncdFriends = friendsList.map(friend => {
          return {
            friendId: friend.friendId,
            friendName: friend.friendName,
            friendLogin: friend.friendLogin,
            friendUrl: friend.friendUrl,
            friendAvatarUrl: friend.friendAvatarUrl,
            friendBio: friend.friendBio,
            friendCompany: friend.friendCompany,
            friendFollowers: friend.friendFollowers,
            friendTotalStars: friend.friendTotalStars,
            friendLocation: friend.friendLocation,
            friendEmail: friend.friendEmail,
            friendCreated_at: friend.friendCreated_at,
          }
        });
        // console.log("friendsList", JSON.stringify(friendsList));
        let response = {
          statusCode: 200,
          headers: {"Access-Control-Allow-Origin": "*"},
          body: JSON.stringify(TruncdFriends),
        };
        console.log("Get followers successfully");
        callback(null, response);
      })
      .catch((err) => {
        console.error("err", err, err.stack);
        callback(new Error("Error found:", err));
      });
};

const main = (event, context, callback) => {
  switch (event.path) {
    case "/user/getFollowers":
      handleGetFollowers(event, context, callback);
      break;
    case "/user/follow":
      handleFollow(event, context, callback);
      break;
  }
};

module.exports = main;
