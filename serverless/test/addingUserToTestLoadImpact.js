'use strict';
const config = require('../config').githubConfig;
let AWS = require("aws-sdk");
let docClient = new AWS.DynamoDB.DocumentClient();
let newUserNumber = 200;

const main = (event, context, callback) => {
  let userBase = { following: 24, following_url: 'https://api.github.com/users/ChenLi0830/following{/other_user}', followers: 18, crit_StargazersCount: 0, crit_FollowersCount: 0, subscriptions_url: 'https://api.github.com/users/ChenLi0830/subscriptions', url: 'https://api.github.com/users/ChenLi0830', name: 'Chen Li', organizations_url: 'https://api.github.com/users/ChenLi0830/orgs', totalStars: 5, max_created_at: 1483898623973, gists_url: 'https://api.github.com/users/ChenLi0830/gists{/gist_id}', login: 'ChenLi0830', token: '2e2b1773ffee16268fe16f1ab33f086f12d5e410', company: '@GitMax-CN ', isLogging: true, id: 9557418, public_repos: 12, public_gists: 1, location: 'Vancouver, Canada', created_at: '2014-11-04T18:38:26Z', followers_url: 'https://api.github.com/users/ChenLi0830/followers', bio: 'Tech enthusiast, enjoy making things. ', followedFriendsAt: 1483898628164, avatar_url: 'https://avatars.githubusercontent.com/u/9557418?v=3', events_url: 'https://api.github.com/users/ChenLi0830/events{/privacy}', html_url: 'https://github.com/ChenLi0830', repos_url: 'https://api.github.com/users/ChenLi0830/repos', updated_at: '2017-01-07T04:32:31Z', received_events_url: 'https://api.github.com/users/ChenLi0830/received_events', isFollowing: false, addFollowersMax: 5000, starred_url: 'https://api.github.com/users/ChenLi0830/starred{/owner}{/repo}', addFollowersNow: 99, hireable: true, type: 'User' };
  let promises = [];
  for (let i=0; i<newUserNumber; i++){
    let newUser = Object.assign({}, userBase);
    newUser.id = i;
    promises.push(new Promise((resolve, reject)=>{
      let params = {
        TableName: "Users",
        Item: newUser,
      };
      
      docClient.put(params, (err, data)=>{
        if (err){
          console.error(`Unable to insert newUser ${i}`, JSON.stringify(err));
          return reject(err);
        }
        resolve(data);
      })
    }))
  }
  
  Promise.all(promises)
      .then(result => {
        console.log(`Inserted ${newUserNumber} users successfully`);
        callback(null, result);
      })
      .catch(e => {
        console.error(e);
        callback(e);
      });
};

module.exports = main;