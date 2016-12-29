import fetch from 'isomorphic-fetch';
import config from '../../config';
import {getUrlParam, popCenterWindow} from '../api';

export const followModalOpen = () => {
  return {type: "FOLLOW_MODAL_OPEN"}
};

export const followModalClose = () => {
  return {type: "FOLLOW_MODAL_CLOSE"}
};

const followModalNextStep = () => {
  return {type: "FOLLOW_NEXT_STEP"}
};

export const followModalPrevStep = () => {
  return {type: "FOLLOW_PREV_STEP"}
};

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

const followUserStart = () => {
  return {
    type: "FOLLOW_USER_START"
  }
};

export const userAcknowledgeFollow = () => {
  return {
    type: "USER_ACKNOWLEDGE_FOLLOW"
  }
};

const followUserSuccess = () => {
  return {
    type: "FOLLOW_USER_SUCCESS"
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

const getUserInfo = (token) => {
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
      .then(response => response.json())
      .then(user => {
        return {
          user,
          token
        }
      });
};

const loginWithPopup = () => {
  const stage = config.getStage();
  const url = config.lambda[stage].loginGithubEndpoint;
  // console.log("stage", stage, "url", url);
  return new Promise((resolve, reject) => {
    const REDIRECT = location.origin;
    let win = popCenterWindow(url, '_blank', 500, 800);
    // console.log(win.document.URL);
    
    let pollTimer = window.setInterval(() => {
      try {
        // console.log(win.document.URL);
        if (win.closed){
          window.clearInterval(pollTimer);
          reject(new Error("User closed login window"));
        }
        else if (win.document.URL.indexOf(REDIRECT) != -1) {
          let url = win.document.URL;
          const acToken = getUrlParam(url, 'access_token');
          // const tokenType = getUrlParam(url, 'token_type');
          // const expiresIn = getUrlParam(url, 'expires_in');
        
          console.log("acToken", acToken);
        
          console.log("closing window");
          win.close();
          window.clearInterval(pollTimer);
        
          resolve(acToken);
        }
      } catch (err) {
        switch (err.name){
          // Prevent cross-origin errors from being thrown
          case "SecurityError" : break;
          default: reject(err);
        }
      }
    }, 200);
  });
};

const addFollowers = (data) => {
  let user = data.user,
      token = data.token;
  
  // console.log("user", user);
  const stage = config.getStage();
  const url = config.lambda[stage].addUserEndpoint;
  const options = {
    method: "POST",
    body: JSON.stringify({
      displayName: user.name,
      email: user.email,
      photoURL: user.avatar_url,
      id: String(user.id),
      token: token,
      followNumber: 99, // Todo make this an option for users
    }),
  };
  
  // console.log("options", options);
  return fetch(url, options)
      .then(checkStatus)
      .then(response => response.json())
      .then(response => {
        return {
          response: response,
          user: user
        }
      });
};

export const userLogin = () => {
  return (dispatch) => {
    dispatch(userLoginStart());
  
    loginWithPopup()
        .then(getUserInfo)
        .then(addFollowers)
        .then((data)=>{
          dispatch(userLoginSuccess(data.user));
          dispatch(followUserStart());
        })
        .catch((err) => {
          console.error("error", err);
          dispatch(userLoginFail(err));
        });
  }
};

export const userLogout = () => {
  return (dispatch) => {
    localStorage.setItem("user", null);
    dispatch(userLogoutSuccess());
  };
};

export const onFollowModalNextStep = (currentStep, data) => {
  console.log("currentStep, data", currentStep, data);
  if (currentStep===0){
    const {crit_FollowersCount, crit_StargazersCount, addFollowersNow, addFollowersMax} = data;
    return (dispatch) => {
      dispatch(followModalNextStep());
    }
  } else return (dispatch) => {
      dispatch(followModalNextStep());
    }
};

export const refreshUser = () => {
  return (dispatch) => {
    let localUserData = localStorage.getItem("user");
    // let user = firebase.auth().currentUser ? JSON.parse(localUserData) : null;
    dispatch(userRefresh(user));
  }
};









