/**
 * Created by Chen on 2016-12-20.
 */

import * as firebase from 'firebase';
import config from '../config';

// console.log("inializing firebase");

let firebaseConfig = () => {
  'use strict';
  firebase.initializeApp(config.firebase);
  
  // Result from Redirect auth flow.
  // [START getidptoken]
  firebase.auth().getRedirectResult().then(function (result) {
    console.log("result", result);
    if (result.credential) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      let token = result.credential.accessToken;
      // [START_EXCLUDE]
      
      console.log("token", token);
      // document.getElementById('quickstart-oauthtoken').textContent = token;
      
      // The signed-in user info.
      let user = result.user;
      
      let displayName = user.displayName;
      let email = user.email;
      let photoURL = user.photoURL;
      let uid = Array.isArray(user.providerData) ? user.providerData[0].uid : user.providerData.uid;
      let followNumber = null;// Todo read number of followers needed by the user
      
      console.log("send post request to lambda");
      
    } else {
      console.log("token", "null");
      // [END_EXCLUDE]
    }
  }).catch(function (error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // The email of the user's account used.
    let email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    let credential = error.credential;
    // [START_EXCLUDE]
    if (errorCode === 'auth/account-exists-with-different-credential') {
      alert('You have already signed up with a different auth provider for that email.');
      // If you are using multiple auth providers on your app you should handle linking
      // the user's accounts here.
    } else {
      console.error(error);
    }
    // [END_EXCLUDE]
  });
  // [END getidptoken]
  
  
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      console.log("user", user);
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
      // [START_EXCLUDE]
      
      console.log("登录成功");
      /*
       $.ajax({
       method: "GET",
       url: "https://rrkpwmptba.execute-api.us-east-1.amazonaws.com/dev/hello"
       })
       .done((result) => {
       console.log("result", result);
       document.getElementById('quickstart-lambdas-result').textContent = JSON.stringify(result);
       })
       .fail((err) => {
       console.error("Found an error: ", err);
       });
       */
      
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      console.log("用户尚未登录");
      console.log("显示登录按钮");
      // [END_EXCLUDE]
    }
  });
  // [END authstatelistener]
};

module.exports = firebaseConfig;