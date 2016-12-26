'use strict';

// let fs = require('fs');
let OAuth2 = require('oauth').OAuth2;
const config = require('../config').githubConfig;

const requestToken = (event, context, callback) => {
  let params = event.queryStringParameters;
  // console.log("params", params);
  // console.log("event", JSON.stringify(event));
  // console.log("context", JSON.stringify(context));
  
  let oauth2 = new OAuth2(
      config.clientID,
      config.clientSecret,
      config.baseURI,
      config.authorizeUrl,
      config.accessTokenUrl,
      null); /** Custom headers */
  
  let options = {};
  if (config.callbackURI) options.redirect_uri = config.callbackURI;
  
  // let authURL = oauth2.getAuthorizeUrl({
  //   redirect_uri: 'http://localhost:8080/code',
  //   scope: ['repo', 'user'],
  //   state: 'some random string to protect against cross-site request forgery attacks'
  // });
  //
  // console.log("authURL", authURL);
  //
  // const response = {
  //   statusCode: 301,
  //   headers: {
  //     Location: authURL,
  //   },
  //   body: '',
  // };
  //
  // callback(null, response);

  
  if (params["code"]){
    console.log("start to get token");

    oauth2.getOAuthAccessToken(
        params["code"],
        {'redirect_uri': config.redirectUrl},
        function (e, access_token, refresh_token, results) {
          console.log("access_token", access_token);
          console.log("refresh_token", refresh_token);
          console.log("results", results);
          if (e) {
            callback(new Error("Server responded with a " + e.statusCode + " status"));
            return
          }
          if (results.error) {
            callback(new Error(results.error_description));
            return;
          }

          const response = {
            statusCode: 200,
            headers: {"Access-Control-Allow-Origin": "*"},
            body: JSON.stringify(results),
          };
          callback(null, response);
          // context.succeed(access_token);
        }
    );
  }
  else if (params["access_token"]){
    console.log("received token");
    const response = {
      statusCode: 200,
      headers: {"Access-Control-Allow-Origin": "*"},
      body: JSON.stringify(params),
    };
    callback(null, response);
  }
};

module.exports = requestToken;