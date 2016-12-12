/**
 * Created by Chen on 2016-12-11.
 */

'use strict';

let AWS = require("aws-sdk");
let docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (event, context, callback) => {
  // console.log("event.body", event.body);
  let data = JSON.parse(event.body);
  if (!data.id || !data.token) callback(new Error("Data format error: id and token are required."));
  
  let params = {
    TableName:"test",
    Item: {
      ...data,
      registeredAt: new Date().getTime(),
    },
  };
  
  docClient.put(params, function(err, data) {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
    }
  });
  
  const response = {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin" : "*"},
    body: JSON.stringify({
      message: 'get event successfully!',
    }),
  };
  
  callback(null, response);
  // const data = event.body;
};