import * as firebase from 'firebase';

const userLoginStart = () => {
  'use strict';
  return {
    type: "USER_LOGIN_START",
  }
};

const userLoginSuccess = (user) => {
  'use strict';
  return {
    type: "USER_LOGIN_SUCCESS",
    user,
  }
};

const userLoginFail = (error) => {
  'use strict';
  return {
    type: "USER_LOGIN_FAIL",
    error
  }
};

const userLogoutSuccess = () => {
  'use strict';
  return {
    type: "USER_LOGOUT",
  }
};

export const userLogin = () => {
  'use strict';
  return (dispatch) => {
    dispatch(userLoginStart());
  
    let provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('public_repo');
    provider.addScope('user:follow');
    
    firebase.auth().signInWithPopup(provider).then(result => {
      console.log("userLogin result", result);
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      dispatch(userLoginSuccess(user));
    }).catch(function(error) {
      console.log("userLogin error", error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      dispatch(userLoginFail(error));
    });
  }
};

export const userLogout = () => {
  'use strict';
  return (dispatch) => {
    firebase.auth().signOut().then(result => {
      console.log("logout promise result", result);
      dispatch(userLogoutSuccess());
    });
  };
};

export const addFollowers = (followers) => {
  'use strict';
  return {
    type: "ADD_FOLLOWERS",
    followers: followers,
  }
};








