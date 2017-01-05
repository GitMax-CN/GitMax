import fetch from 'isomorphic-fetch';
import config from '../../config';
import {getUrlParam, popCenterWindow, passTimeLimit, calcMinsLeft} from '../api';

const fetchFriendsSuccess = (friendList) => {
  return {
    type: "FETCH_FRIENDS_SUCCESS",
    friendList: friendList,
  }
};

export const initialConfigModalOpen = () => {
  return {type: "INITIAL_CONFIG_MODAL_OPEN"}
};

export const initialConfigModalClose = () => {
  return {type: "INITIAL_CONFIG_MODAL_CLOSE"}
};

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

const userUpdateSuccess = (user) => {
  return {
    type: "USER_UPDATE_SUCCESS",
    user,
  }
};

export const showMessage = ({type, content}) => {
  if (type !== "loading")
    return {
      type: "GLOBAL_MESSAGE_SHOW",
      msg: {
        type,
        content
      }
    };
  else
    return {
      type: "GLOBAL_MESSAGE_LOADING_SHOW",
      msg: {
        type,
        content
      }
    }
};

export const clearMessage = () => {
  return {
    type: "GLOBAL_MESSAGE_CLEAR",
  }
};

export const clearMessageLoading = () => {
  return {
    type: "GLOBAL_MESSAGE_LOADING_CLEAR"
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
    let win = popCenterWindow(`${url}?state=${location.origin}`, '_blank', 500, 800);
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
 * Save the changed config to database if config is changed (data里的属性与对应user属性不同)
 * @param user
 * @param data
 * @returns {Promise.<user>}
 */
export const saveUserIfChanged = (user, data) => {
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

export const userLogin = (router) => {
  return (dispatch) => {
    
    dispatch(userLoginStart());
    loginWithPopup()
    // .then(getUserInfo)
        .then(upsertGitUser)
        .then(({user, data}) => {
          dispatch(userLoginSuccess(user));
          
          const isNewUser = !user.followedFriendsAt;
          if (isNewUser) {
            dispatch(initialConfigModalOpen());
          } else {
            router.push('/app/addFollower');
          }
          // dispatch(followModalOpen());
        })
        .catch((err) => {
          console.error("error", err);
          dispatch(userLoginFail(err));
        });
  }
};

export const goToFriendsListPage = (router) => {
  return (dispatch) => {
    dispatch(onFetchFriends());
    router.push('/app/friends');
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
  return configChanged;
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

//dispatch(modalOpen)
export const onStartFollow = () => {
  return (dispatch, getState) => {
    const user = getState().user;
    
    if (!passTimeLimit(user.followedFriendsAt)) {
      
      let minsLeft = calcMinsLeft(user.followedFriendsAt);
      let hoursLeft = Math.trunc(minsLeft / 60);
      minsLeft = Math.trunc(minsLeft % 60);
      const content = `每次手动添加好友，需间隔24小时，请${hoursLeft}小时${minsLeft}分钟后再试`;
      
      return dispatch(showMessage({type: "warning", content: content}));
      // setTimeout(()=>{dispatch(followModalClose())}, 1000);
      // dispatch(showMessage({type: "success", content: "设置已保存"}));
      // return dispatch(followUserFail(new Error("添加好友过于频繁：用户每24小时只能添加一次好友")));
    } else {
      // dispatch(showMessage({type: "loading", content: "正在为你添加好友，请稍候"}));
      dispatch(followModalOpen());
      return followUsers(user)
          .then(({newFriends, user}) => {
            // dispatch(clearMessageLoading());
            dispatch(followUserSuccess(newFriends));
            dispatch(userLoginSuccess(user));
            dispatch(followModalNextStep());
          });
      
      // dispatch(followModalNextStep());
      // dispatch(loadNextBtn("添加中"));
      // // throw new Error("Stopped manually for testing");
      // return followUsers(user)
      //     .then(({newFriends, user}) => {
      //
      //       dispatch(followUserSuccess(newFriends));
      //       dispatch(userLoginSuccess(user));
      //       dispatch(followModalNextStep());
      //     })
    }
  };
};

export const saveConfigIfChanged = (data) => {
  return (dispatch, getState) => {
    const user = getState().user;
    // console.log("user", user);
    // console.log("data", data);
    
    const canUpdate = canUpdateConfig(user, data);
    
    if (!canUpdate) {
      console.log("config not Changed");
      return user;
    }
    
    console.log("configChanged");
    const newUser = Object.assign({}, user, data);
    return updateConfig(newUser)
        .then(user => {
          console.log("user is updated ", user);
          dispatch(userUpdateSuccess(user))
        })
        .catch(err => {
          console.error(err);
          dispatch(showMessage({type: "error", content: "设置未保存成功，请重试"}));
        });
  }
};

export const onInitialModalSave = (data, router) => {
  return (dispatch) => {
    return Promise.resolve(dispatch(saveConfigIfChanged(data)))
        .then(() => {
          dispatch(initialConfigModalClose());
          router.push('/app/addFollower');
        })
        .catch(err => {
          console.error(err);
          dispatch(showMessage({type: "error", content: "跳转应用出错"}))
        })
  }
};

const fetchFriends = (user) => {
  // console.log("getUserInfo start - token", token);
  const stage = config.getStage();
  const url = config.lambda[stage].getFollowersEndpoint;
  
  const options = {
    method: "POST",
    body: JSON.stringify({user: user}),
  };
  
  return fetch(url, options)
      .then(checkStatus)
      .then(response => response.json())
      .then(friendList => {
        // console.log("friendList", friendList);
        return friendList
      });
};
/**
 * fetch friends for the specific user
 */
export const onFetchFriends = () => {
  return (dispatch, getState) => {
    // if (getState().friends.total) {
    //   return;
    // }
    console.log();
    dispatch(showMessage({type: "loading", content: "获得好友中"}));
    
    fetchFriends(getState().user)
        .then((friendList)=>{
          dispatch(fetchFriendsSuccess(friendList));
          dispatch(clearMessageLoading());
        })
        .catch((error)=>{
          console.error(error);
          dispatch(showMessage({type: "error", content: "获得好友中失败，请稍候再试"}));
        });
    
    /*dispatch(friendsUpdated(friends)*/
    // dispatch(clearMessageLoading());
  };
  
};




