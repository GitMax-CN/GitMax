import config from '../../../config';
import * as t from './actionTypes';
import {initialConfigModalActions, globalMessageActions} from '../index';
import {getUrlParam, popCenterWindow} from '../../api';

export const userRefresh = (user) => {
  return {
    type: t.REFRESH,
    user
  }
};

export const userLoginStart = () => {
  return {
    type: t.LOGIN_START,
  }
};

export const userLoginSuccess = (user) => {
  return {
    type: t.LOGIN_SUCCESS,
    user,
  }
};

export const userUpdateSuccess = (user) => {
  return {
    type: t.UPDATE_SUCCESS,
    user,
  }
};

export const userLoginFail = (error) => {
  console.error(error);
  return {
    type: t.LOGIN_FAIL,
    errorMessage
  }
};

export const userLogoutStart = () => {
  return {
    type: t.LOGOUT_START,
  }
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
            dispatch(initialConfigModalActions.initialConfigModalOpen());
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

export const userLogout = () => {
  return (dispatch) => {
    // localStorage.setItem("user", null);
    dispatch(globalMessageActions.showMessage({type: "info", content: "用户登出中"}));
    dispatch(userLogoutStart());
    setTimeout(() => window.location.reload(), 2000);
  };
};

export const updateConfig = (user) => {
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

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error
  }
}

const canUpdateConfig = (user, data) => {
  // console.log("user", user);
  // console.log("data", data);
  const configChanged = Object.keys(data).reduce((result, key) => {
    return result || user[key] !== data[key];
  }, false);
  return configChanged;
};

/**
 * Save the changed config to database if config is changed (when data里的属性与对应user属性不同)
 */
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
    dispatch(globalMessageActions.showMessage({type: "loading", content: "保存中"}));
    const newUser = Object.assign({}, user, data);
    return updateConfig(newUser)
        .then(user => {
          // console.log("user is updated ", user);
          dispatch(userUpdateSuccess(user));
          dispatch(globalMessageActions.clearMessageLoading());
          dispatch(globalMessageActions.showMessage({type: "success", content: "保存成功"}));
        })
        .catch(err => {
          console.error(err);
          dispatch(globalMessageActions.showMessage({type: "error", content: "设置未保存成功，请重试"}));
        });
  }
};

export const refreshUser = () => {
  return (dispatch) => {
    let localUserData = localStorage.getItem("user");
    // let user = firebase.auth().currentUser ? JSON.parse(localUserData) : null;
    dispatch(userRefresh(user));
  }
};