import React from 'react';
import {render} from 'react-dom';
import PageNotFound from './PageNotFound.jsx';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import App from './App.jsx';
// import Home from './Home.jsx';
import Edit from './Edit.jsx';
import AboutPage from './AboutPage.jsx';
import HOME from './Home/index.jsx';
import * as firebase from 'firebase';

let config = {// Todo check if this is safe
  apiKey: "AIzaSyAab1zs9uBoYdQ_PYJHKe_b0_I3837FoLw",
  authDomain: "gitmax-5fcea.firebaseapp.com",
  databaseURL: "https://gitmax-5fcea.firebaseio.com",
  storageBucket: "gitmax-5fcea.appspot.com",
  messagingSenderId: "113159157575"
};
console.log("inializeing firebase");
firebase.initializeApp(config);

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

window.toggleSignIn = function toggleSignIn() {
  if (!firebase.auth().currentUser) {
    console.log("start logging in ");
    // [START createprovider]
    let provider = new firebase.auth.GithubAuthProvider();
    // [END createprovider]
    // [START addscopes]
    provider.addScope('public_repo');
    provider.addScope('user:follow');
    // [END addscopes]
    // [START signin]
    firebase.auth().signInWithRedirect(provider);
    // [END signin]
  } else {
    console.log("start logging out");
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  }
  //取消sign-in button
};

// toggleSignIn();

const router = (
    <Router history={hashHistory}>
      <Route path="/" component={HOME}>
        {/*<IndexRoute component={Edit}/>*/}
        {/*<Route path="about" component={AboutPage}/>*/}
      </Route>
      {/*<Route path="*" component={PageNotFound}/>*/}
    </Router>
);

render(router, document.getElementById('app'));