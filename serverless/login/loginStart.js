'use strict';

let OAuth2 = require('oauth').OAuth2;
const config = require('../config').githubConfig;

const main = (event, context, callback) => {
  // let params = event && event.queryStringParameters;
  // console.log("params");
  
  let oauth2 = new OAuth2(
      config.clientID,
      config.clientSecret,
      config.baseURI,
      config.authorizeUrl,
      config.accessTokenUrl,
      null); /** Custom headers */
  
  let authURL = oauth2.getAuthorizeUrl({
    // redirect_uri: config.callbackURI,
    scope: 'public_repo user:follow',
    state: 'rYdVsUnGKVYaa9avH3iDyVir'
  });
  
  console.log("authURL", authURL);
  
  const response = {
    statusCode: 302,
    headers: {
      Location: authURL,
    },
    body: '',
  };
  callback(null, response);
  
  // const logResponse = {
  //   statusCode: 202,
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //   },
  //   body: JSON.stringify({message: "start redirecting"}),
  // };
  // callback(null, logResponse);
  
};

module.exports = main;