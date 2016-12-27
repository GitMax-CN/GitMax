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
    statusCode: 301,
    headers: {
      Location: authURL,
    },
    body: '',
  };

  callback(null, response);

};

module.exports = main;