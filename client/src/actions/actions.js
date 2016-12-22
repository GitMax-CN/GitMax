import * as firebase from 'firebase';
import fetch from 'isomorphic-fetch';

const userRefresh = (user) => {
  return {
    type: "USER_REFRESH",
    user
  }
};

const userLoginStart = () => {
  return {
    type: "USER_LOGIN_START",
  }
};

const userLoginSuccess = (user) => {
  return {
    type: "USER_LOGIN_SUCCESS",
    user,
  }
};

const userLoginFail = (error) => {
  
  let errorCode = error.code;
  let errorMessage = error.message;
  // The email of the user's account used.
  let email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  let credential = error.credential;
  return {
    type: "USER_LOGIN_FAIL",
    errorMessage
  }
};

const userLogoutSuccess = () => {
  return {
    type: "USER_LOGOUT",
  }
};

const mutualFollowStart = () => {
  return {
    type: "MUTUAL_FOLLOW_START"
  }
};

const mutualFollowSuccess = () => {
  return {
    type: "MUTUAL_FOLLOW_SUCCESS"
  }
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error
  }
};

const getUserInfo = ({token, email, id, followNumber}) => {
  // console.log("getUserInfo start - token", token);
  
  let url = "https://api.github.com/user?access_token=" + token;
  let options = {
    method: "get",
    headers: {
      'User-Agent': "GitMax"
    }
  };
  
  return fetch(url, options)
      .then(checkStatus)
      .then(response => response.json());
};

export const userLogin = () => {
  return (dispatch) => {
    dispatch(userLoginStart());
    
    let provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('public_repo');
    provider.addScope('user:follow');
    
    firebase.auth().signInWithPopup(provider)
        .then(result => {
          console.log("result", result);
          let token = result.credential.accessToken;
          let user = {
            token,
            email: result.user.email,
            id: Array.isArray(result.user.providerData) ? result.user.providerData[0].uid :
                result.user.providerData.uid,
            followNumber: null
          };
          // console.log("user from login response", user);
          return user;
        })
        .then(getUserInfo)
        .then((user) => {
          // console.log("user", user);
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(userLoginSuccess(user));
        })
        .catch(function (error) {
          console.log("userLogin error", error);
          // Handle Errors here.
          dispatch(userLoginFail(error));
        });
  }
};

export const userLogout = () => {
  return (dispatch) => {
    firebase.auth().signOut().then(result => {
      localStorage.setItem("user", null);
      console.log("firebase.auth().currentUser", firebase.auth().currentUser);
      dispatch(userLogoutSuccess());
    });
  };
};

export const refreshUser = () => {
  console.log("firebase.auth().currentUser", firebase.auth().currentUser);
  setTimeout(()=>console.log("firebase.auth().currentUser", firebase.auth().currentUser), 3000);
  return (dispatch) => {
    let localUserData = localStorage.getItem("user");
    let user = firebase.auth().currentUser ? JSON.parse(localUserData) : null;
    dispatch(userRefresh(user));
  }
};

export const addFollowers = (followers) => {
  return {
    type: "ADD_FOLLOWERS",
    followers: followers,
  }
};








