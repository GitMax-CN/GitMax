import fetch from 'isomorphic-fetch';
import config from '../../config';
import {getUrlParam, popCenterWindow, oneDayHasPassed} from '../api';



// const fetchFriendsSuccess = (friendList) => {
//   return {
//     type: "FETCH_FRIENDS_SUCCESS",
//     friendList: friendList,
//   }
// };













// const userRefresh = (user) => {
//   return {
//     type: "USER_REFRESH",
//     user
//   }
// };

// const userLoginStart = () => {
//   return {
//     type: "USER_LOGIN_START",
//   }
// };

// const userLoginSuccess = (user) => {
//   return {
//     type: "USER_LOGIN_SUCCESS",
//     user,
//   }
// };

// const userUpdateSuccess = (user) => {
//   return {
//     type: "USER_UPDATE_SUCCESS",
//     user,
//   }
// };


// export const changeFriendListPageNumber = (page) => {
//   return {
//     type: t.CHANGE_FRIEND_LIST_PAGE_NUMBER,
//     page,
//   }
// };


// const userLoginFail = (error) => {
//   let errorCode = error.code;
//   let errorMessage = error.message;
//   // The email of the user's account used.
//   let email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   let credential = error.credential;
//   return {
//     type: "USER_LOGIN_FAIL",
//     errorMessage
//   }
// };
//
// const userLogoutStart = () => {
//   return {
//     type: "USER_LOGOUT_START",
//   }
// };

// const userLogoutSuccess = () => {
//   return {
//     type: "USER_LOGOUT_SUCCESS",
//   }
// };
//
// const followUserStart = () => {
//   return {
//     type: "FOLLOW_USER_START"
//   }
// };
//
// export const userAcknowledgeFollow = () => {
//   return {
//     type: "USER_ACKNOWLEDGE_FOLLOW"
//   }
// };

// const followUserSuccess = (newFriends) => {
//   return {
//     type: "FOLLOW_USER_SUCCESS",
//     newFriends
//   }
// };

// const loadNextBtn = (msg) => {
//   return {
//     type: "LOAD_NEXT_BUTTON",
//     message: msg || "处理中"
//   }
// };
//
// const followUserFail = () => {
//   return {
//     type: "FOLLOW_USER_FAIL"
//   }
// };

// const checkStatus = (response) => {
//   if (response.status >= 200 && response.status < 300) {
//     return response
//   } else {
//     let error = new Error(response.statusText);
//     error.response = response;
//     throw error
//   }
// };

// const getUserInfo = (token) => {
//   // console.log("getUserInfo start - token", token);
//
//   let url = "https://api.github.com/user?access_token=" + token;
//   let options = {
//     method: "get",
//     headers: {
//       'User-Agent': "GitMax"
//     }
//   };
//
//   return fetch(url, options)
//       .then(checkStatus)
//       .then(response => response.json())
//       .then(user => {
//         user.token = token;
//         return user
//       });
// };

// const loginWithPopup = () => {
//   const stage = config.getStage();
//   const url = config.lambda[stage].loginGithubEndpoint;
//   // console.log("stage", stage, "url", url);
//   return new Promise((resolve, reject) => {
//     const REDIRECT = location.origin;
//     let win = popCenterWindow(`${url}?state=${location.origin}`, '_blank', 500, 800);
//     // console.log(win.document.URL);
//
//     let pollTimer = window.setInterval(() => {
//       try {
//         // console.log(win.document.URL);
//         if (win.closed) {
//           window.clearInterval(pollTimer);
//           reject(new Error("User closed login window"));
//         }
//         else if (win.document.URL.indexOf(REDIRECT) != -1) {
//           let url = win.document.URL;
//           const acToken = getUrlParam(url, 'access_token');
//           // const tokenType = getUrlParam(url, 'token_type');
//           // const expiresIn = getUrlParam(url, 'expires_in');
//
//           // console.log("acToken", acToken);
//
//           // console.log("closing window");
//           win.close();
//           window.clearInterval(pollTimer);
//
//           resolve(acToken);
//         }
//       } catch (err) {
//         switch (err.name) {
//             // Prevent cross-origin errors from being thrown
//           case "SecurityError" :
//             break;
//           default:
//             reject(err);
//         }
//       }
//     }, 200);
//   });
// };

/**
 * @param token
 * @returns {Promise.<user>}
 */
// const upsertGitUser = (token) => {
//   // console.log("user", user);
//   const stage = config.getStage();
//   const url = config.lambda[stage].gitUpsertEndpoint;
//   const options = {
//     method: "POST",
//     body: JSON.stringify({token: token}),
//   };
//
//   // console.log("options", options);
//   return fetch(url, options)
//       .then(checkStatus)
//       .then(response => response.json())
//       .then(response => {//{user}
//         // console.log("response", response);
//         return response;
//       });
// };

// const updateConfig = (user) => {
//   const stage = config.getStage();
//   const url = config.lambda[stage].configUpdateEndpoint;
//   const options = {
//     method: "POST",
//     body: JSON.stringify({user: user}),
//   };
//
//   return fetch(url, options)
//       .then(checkStatus)
//       .then(response => response.json())
//       .then(response => {
//         // console.log("response", response);
//         return response.user;
//       })
// };

// const followUsers = (user) => {
//   const stage = config.getStage();
//   const url = config.lambda[stage].followUsersEndpoint;
//   const options = {
//     method: "POST",
//     body: JSON.stringify({user}),
//   };
//
//   return fetch(url, options)
//       .then(checkStatus)
//       .then(response => response.json())
//       .then(response => {
//         // console.log("response", response);
//         return response;
//       })
// };

// export const userLogin = (router) => {
//   return (dispatch) => {
//
//     dispatch(userLoginStart());
//     loginWithPopup()
//     // .then(getUserInfo)
//         .then(upsertGitUser)
//         .then(({user, data}) => {
//           dispatch(userLoginSuccess(user));
//
//           const isNewUser = !user.followedFriendsAt;
//           if (isNewUser) {
//             dispatch(initialConfigModalOpen());
//           } else {
//             router.push('/app/addFollower');
//           }
//           // dispatch(followModalOpen());
//         })
//         .catch((err) => {
//           console.error("error", err);
//           dispatch(userLoginFail(err));
//         });
//   }
// };

// export const goToFriendsListPage = (router) => {
//   return (dispatch) => {
//     dispatch(onFetchFriends());
//     router.push('/app/friends');
//   }
// };

// export const userLogout = () => {
//   return (dispatch) => {
//     // localStorage.setItem("user", null);
//     dispatch(showMessage({type:"info", content:"用户登出中"}));
//     dispatch(userLogoutStart());
//     setTimeout(() => window.location.reload(), 2000);
//   };
// };

// const canUpdateConfig = (user, data) => {
//   // console.log("user", user);
//   // console.log("data", data);
//   const configChanged = Object.keys(data).reduce((result, key) => {
//     return result || user[key] !== data[key];
//   }, false);
//   return configChanged;
// };

// export const refreshUser = () => {
//   return (dispatch) => {
//     let localUserData = localStorage.getItem("user");
//     // let user = firebase.auth().currentUser ? JSON.parse(localUserData) : null;
//     dispatch(userRefresh(user));
//   }
// };

// export const onStartFollow = () => {
//   return (dispatch, getState) => {
//     const user = getState().user;
//
//     if (!oneDayHasPassed(user.followedFriendsAt)) {
//       const content = `每天只能手动添加好友一次，请明天再试`;
//
//       return dispatch(showMessage({type: "warning", content: content}));
//     } else {
//       dispatch(followModalOpen());
//       return followUsers(user)
//           .then(({newFriends, user}) => {
//             // throw new Error("manual break");
//             // dispatch(clearMessageLoading());
//             dispatch(followUserSuccess(newFriends));
//             dispatch(userLoginSuccess(user));
//             dispatch(followModalNextStep());
//           })
//           .catch(err => {
//             console.error(err);
//             dispatch(showMessage({type: "error", content:"添加好友失败"}));
//             dispatch(followModalClose());
//           });
//
//     }
//   };
// };
// /**
//  * Save the changed config to database if config is changed (data里的属性与对应user属性不同)
//  * @param data
//  * @returns {Promise.<user>}
//  */
// export const saveConfigIfChanged = (data) => {
//   return (dispatch, getState) => {
//     const user = getState().user;
//     // console.log("user", user);
//     // console.log("data", data);
//
//     const canUpdate = canUpdateConfig(user, data);
//
//     if (!canUpdate) {
//       console.log("config not Changed");
//       return user;
//     }
//
//     console.log("configChanged");
//     dispatch(showMessage({type:"loading", content: "保存中"}));
//     const newUser = Object.assign({}, user, data);
//     return updateConfig(newUser)
//         .then(user => {
//           // console.log("user is updated ", user);
//           dispatch(userUpdateSuccess(user));
//           dispatch(clearMessageLoading());
//           dispatch(showMessage({type:"success", content: "保存成功"}));
//         })
//         .catch(err => {
//           console.error(err);
//           dispatch(showMessage({type: "error", content: "设置未保存成功，请重试"}));
//         });
//   }
// };

// export const onInitialModalSave = (data, router) => {
//   return (dispatch, getState) => {
//     dispatch(showMessage({type:"loading", content: "保存中"}));
//     const user = getState().user;
//     const newUser = Object.assign({}, user, data);
//     return updateConfig(newUser)
//         .then(user => {
//           // console.log("user is updated ", user);
//           dispatch(userUpdateSuccess(user));
//           dispatch(clearMessageLoading());
//           dispatch(showMessage({type:"success", content: "保存成功"}));
//         })
//         .then(() => {
//           dispatch(initialConfigModalClose());
//           setTimeout(()=>router.push('/app/addFollower'), 500);//Let modal close before redirect
//         })
//         .catch(err => {
//           console.error(err);
//           dispatch(showMessage({type: "error", content: "保存出错，请重试"}));
//         })
//   }
// };

// const fetchFriends = (user) => {
//   // console.log("getUserInfo start - token", token);
//   const stage = config.getStage();
//   const url = config.lambda[stage].getFollowersEndpoint;
//
//   const options = {
//     method: "POST",
//     body: JSON.stringify({user: user}),
//   };
//
//   return fetch(url, options)
//       .then(checkStatus)
//       .then(response => response.json())
//       .then(friendList => {
//         // console.log("friendList", friendList);
//         return friendList
//       });
// };
/**
 * fetch friends for the specific user
 */
// export const onFetchFriends = () => {
//   return (dispatch, getState) => {
//     // if (getState().friends.total) {
//     //   return;
//     // }
//     console.log();
//     dispatch(showMessage({type: "loading", content: "获得好友中"}));
//
//     fetchFriends(getState().user)
//         .then((friendList)=>{
//           dispatch(fetchFriendsSuccess(friendList));
//           dispatch(clearMessageLoading());
//         })
//         .catch((error)=>{
//           console.error(error);
//           dispatch(showMessage({type: "error", content: "获得好友中失败，请稍候再试"}));
//         });
//
//     /*dispatch(friendsUpdated(friends)*/
//     // dispatch(clearMessageLoading());
//   };
//
// };




