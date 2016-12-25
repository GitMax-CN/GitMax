'use strict';

// let fs = require('fs');
let OAuth2 = require('oauth').OAuth2;

const requestToken = (event, context, callback) => {
  let configJSON;
  let params = event.queryStringParameters;
  console.log("params", params);
  console.log("event", JSON.stringify(event));
  console.log("context", JSON.stringify(context));
  // let config;
  // configJSON = fs.readFileSync('config.json', {encoding: 'utf-8'});
  // config = JSON.parse(configJSON);
  //
  // if (!config) return context.fail('Failed to read configuration');
  const config = {
    clientID: "6707bd9401a01cd50972",
    clientSecret: "7eb545d403d4f85f0662e60ca9c0865c50a976ee",
    baseURI: "https://github.com/",
    authorizeUrl: "login/oauth/authorize",
    accessTokenUrl: "login/oauth/access_token",
    callbackURI: "",
  };
  
  // {
  //   "clientID": "4b7d2e5f12a770aa20e2",
  //     "clientSecret": "7b90949cc7064300017714f4867f4f83dbde0132",
  //     "baseURI": "https://github.com/",
  //     "endpointURI": "login/oauth/access_token",
  //     "callbackURI": null,
  //     "scope": ["user"]
  // }
  //
  
  // _clientId
  // _clientSecret
  // _baseSite
  // _authorizeUrl
  // _accessTokenUrl
  // _accessTokenName
  // _authMethod
  // _customHeaders
  // _useAuthorizationHeaderForGET
  
  
  let oauth2 = new OAuth2(
      config.clientID,
      config.clientSecret,
      'https://github.com/',
      'login/oauth/authorize',
      'login/oauth/access_token',
      null); /** Custom headers */
  
  // let oauth2 = new OAuth2(
  //     config.clientID,
  //     config.clientSecret,
  //     config.baseURI,
  //     null,
  //     config.endpointURI
  // );
  
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
        {'redirect_uri': 'https://obccdycfgi.execute-api.us-west-2.amazonaws.com/prod/getToken'},
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