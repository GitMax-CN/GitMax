import fetch from 'isomorphic-fetch';
import config from '../../config';
import {getUrlParam, popCenterWindow, passTimeLimit} from '../api';

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

export const showMessage = (msg) => {
  return {
    type: "GLOBAL_MESSAGE_SHOW",
    msg
  }
};

export const clearMessage = () => {
  return {
    type: "GLOBAL_MESSAGE_CLEAR",
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

const userLogoutStart = () => {
  return {
    type: "USER_LOGOUT_START",
  }
};
const userLogoutSuccess = () => {
  return {
    type: "USER_LOGOUT_SUCCESS",
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

const followUserSuccess = (newFriends) => {
  return {
    type: "FOLLOW_USER_SUCCESS",
    newFriends
  }
};

const loadNextBtn = (msg) => {
  return {
    type: "LOAD_NEXT_BUTTON",
    message: msg || "处理中"
  }
};

const followUserFail = () => {
  return {
    type: "FOLLOW_USER_FAIL"
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
        user.token = token;
        return user
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
        if (win.closed) {
          window.clearInterval(pollTimer);
          reject(new Error("User closed login window"));
        }
        else if (win.document.URL.indexOf(REDIRECT) != -1) {
          let url = win.document.URL;
          const acToken = getUrlParam(url, 'access_token');
          // const tokenType = getUrlParam(url, 'token_type');
          // const expiresIn = getUrlParam(url, 'expires_in');
          
          // console.log("acToken", acToken);
          
          // console.log("closing window");
          win.close();
          window.clearInterval(pollTimer);
          
          resolve(acToken);
        }
      } catch (err) {
        switch (err.name) {
            // Prevent cross-origin errors from being thrown
          case "SecurityError" :
            break;
          default:
            reject(err);
        }
      }
    }, 200);
  });
};

/**
 * @param token
 * @returns {Promise.<user>}
 */
const upsertGitUser = (token) => {
  // console.log("user", user);
  const stage = config.getStage();
  const url = config.lambda[stage].gitUpsertEndpoint;
  const options = {
    method: "POST",
    body: JSON.stringify({token: token}),
  };
  
  // console.log("options", options);
  return fetch(url, options)
      .then(checkStatus)
      .then(response => response.json())
      .then(response => {//{user}
        // console.log("response", response);
        return response;
      });
};

/**
 * Save the changed config to database if config is changed
 * @param user
 * @param data
 * @returns {Promise.<user>}
 */
const saveUserIfChanged = (user, data) => {
  return new Promise((resolve, reject) => {
    const canUpdate = canUpdateConfig(user, data);
    if (canUpdate) {
      console.log("configChanged");
      const newUser = Object.assign({}, user, data);
      resolve(updateConfig(newUser));
    } else {
      console.log("config not Changed");
      resolve(user);
    }
  })
};

const updateConfig = (user) => {
  const stage = config.getStage();
  const url = config.lambda[stage].configUpdateEndpoint;
  const options = {
    method: "POST",
    body: JSON.stringify({user: user}),
  };
  
  return fetch(url, options)
      .then(checkStatus)
      .then(response => response.json())
      .then(response => {
        // console.log("response", response);
        return response.user;
      })
};

const followUsers = (user) => {
  const stage = config.getStage();
  const url = config.lambda[stage].followUsersEndpoint;
  const options = {
    method: "POST",
    body: JSON.stringify({user}),
  };
  
  return fetch(url, options)
      .then(checkStatus)
      .then(response => response.json())
      .then(response => {
        // console.log("response", response);
        return response;
      })
};

export const userLogin = () => {
  return (dispatch) => {
    
    dispatch(userLoginStart());
    loginWithPopup()
    // .then(getUserInfo)
        .then(upsertGitUser)
        .then(({user, data}) => {
          dispatch(userLoginSuccess(user));
          dispatch(followModalOpen());
        })
        .catch((err) => {
          console.error("error", err);
          dispatch(userLoginFail(err));
        });
  }
};

export const userLogout = () => {
  return (dispatch) => {
    // localStorage.setItem("user", null);
    dispatch(userLogoutStart());
    setTimeout(() => window.location.reload(), 2000);
  };
};

const userCanFollow = (user, data) => {
  const hasNewCrit = Object.keys(data).reduce((canFollow, key) => {
    return canFollow || user[key] !== data[key]
  }, false);
  
  return hasNewCrit || passTimeLimit(user.followedFriendsAt);
};

const canUpdateConfig = (user, data) => {
  // console.log("user", user);
  // console.log("data", data);
  const configChanged = Object.keys(data).reduce((result, key) => {
    return result || user[key] !== data[key];
  }, false);
  const newUser = !user.followedFriendsAt;
  
  return configChanged || newUser;
};

export const onFollowModalNextStep = (currentStep, data) => {
  console.log("currentStep, data", currentStep, data);
  
  switch (currentStep) {
    case 0:
      return (dispatch, getState) => {
        let user = getState().user;
        
        dispatch(loadNextBtn("保存中"));
        saveUserIfChanged(user, data)
            .then((user) => {
              if (!userCanFollow(user, data)) {
                // setTimeout(()=>{dispatch(followModalClose())}, 1000);
                dispatch(showMessage({type: "success", content: "设置已保存"}));
                // return dispatch(followUserFail(new Error("添加好友过于频繁：用户每24小时只能添加一次好友")));
              } else {
                dispatch(followModalNextStep());
                dispatch(loadNextBtn("添加中"));
                // throw new Error("Stopped manually for testing");
                return followUsers(user)
                    .then(({newFriends, user}) => {
                      
                      dispatch(followUserSuccess(newFriends));
                      dispatch(userLoginSuccess(user));
                      dispatch(followModalNextStep());
                    })
              }
            })
            .catch(err => {
              console.error(err);
              dispatch(followUserFail(err));
            });
      };
    case 1:
      return (dispatch) => {
        if (!userCanFollow(user, data)) {
          return dispatch(followUserFail(new Error("添加好友过于频繁：用户每24小时只能添加一次好友")));
        }
      };
    default:
      return (dispatch) => {
        dispatch(followModalNextStep());
      }
  }
};

export const refreshUser = () => {
  return (dispatch) => {
    let localUserData = localStorage.getItem("user");
    // let user = firebase.auth().currentUser ? JSON.parse(localUserData) : null;
    dispatch(userRefresh(user));
  }
};









