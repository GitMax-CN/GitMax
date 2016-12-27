'use strict';

let OAuth2 = require('oauth').OAuth2;
const config = require('../config').githubConfig;

const requestToken = (event, context, callback) => {
  let params = event.queryStringParameters;
  const stage = event.requestContext.stage;
  console.log("params", params);
  console.log("stage", stage);
  // console.log("event", JSON.stringify(event));
  // console.log("context", JSON.stringify(context));
  // console.log("event.requestContext.stage", event.requestContext.stage);
  
  let oauth2 = new OAuth2(
      config.clientID,
      config.clientSecret,
      config.baseURI,
      config.authorizeUrl,
      config.accessTokenUrl,
      null); /** Custom headers */
  
  if (params["code"]){
    console.log("start to get token with code:", params["code"]);

    oauth2.getOAuthAccessToken(
        params["code"],
        /*{'redirect_uri': config.redirectUrl}*/ null,
        function (e, access_token, refresh_token, results) {
          // console.log("access_token", access_token);
          // console.log("refresh_token", refresh_token);
          console.log("results", results);
          if (e) {
            callback(new Error("Server responded with a " + e.statusCode + " status"));
            return
          }
          if (results.error) {
            callback(new Error(results.error_description));
            return;
          }
          
          const baseURL = stage === "dev" ? "http://localhost:5000/#/" : "http://www.gitmax.cn/#/";
  
          const response = {
            statusCode: 302,
            headers: {
              "Access-Control-Allow-Origin": "*",
              Location: baseURL + "?access_token=" + access_token,
            },
            body: JSON.stringify(results),
          };
          callback(null, response);
          // context.succeed(access_token);
  
          // const logResponse = {
          //   statusCode: 202,
          //   headers: {
          //     "Access-Control-Allow-Origin": "*",
          //   },
          //   body: JSON.stringify({message: "start redirecting"}),
          // };
          // callback(null, logResponse);
        }
    );
  }
};

module.exports = requestToken;