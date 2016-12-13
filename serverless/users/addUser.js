/**
 * Created by Chen on 2016-12-11.
 */

'use strict';

let AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

let docClient = new AWS.DynamoDB.DocumentClient();
let request = require('request');

module.exports = (event, context, callback) => {
  let data = JSON.parse(event.body);
  console.log("data", JSON.stringify(data));
  if (!data.id || !data.token) callback(new Error("Data format error: id and token are required."));
  
  let options = {
    url: "https://api.github.com/user/" + data.id + "?access_token=" + data.token,
    method: "get",
    headers: {
      'User-Agent': "GitMax"
    }
  };
  
  request(options, function (error, response, body) {
    if (error) callback(new Error("Can't get user's data from Github:", JSON.stringify(error)));
    else {
      let getData = JSON.parse(body);
      // console.log("data", data);
      // console.log("getData", getData);
      let user = Object.assign({}, getData, {"token": data.token, "email": data.email, "id": data.id});
  
      Object.keys(user).forEach(key => {// Dela with empty attributes
        if (user[key] === null || (typeof user[key] === "string" && user[key].length === 0)) user[key] = "N/A";
      });
      // console.log("user", user);
      
      let params = {
        TableName: "test",
        Item: user,
      };

      docClient.put(params, function (err, data) {
        if (err) {
          console.error("Unable to add item. Error JSON:", JSON.stringify(err));
          callback(new Error(JSON.stringify(err)));
        } else {
          // console.log("Added item:", JSON.stringify(data));
          const response = {
            statusCode: 200,
            headers: {"Access-Control-Allow-Origin": "*"},
            body: JSON.stringify(data),
          };
          callback(null, response);
        }
      });
    }
  });
  
  
};