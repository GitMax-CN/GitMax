import fetch from 'isomorphic-fetch';
import config from '../../../config';
import * as t from './actionTypes';
import {oneDayHasPassed} from '../../api';
import {followModalActions, globalMessageActions, userActions} from '../index';
//followModalOpen, followModalClose, followModalNextStep
// import {showMessage, clearMessageLoading} from '../globalMessage';
// import {userLoginSuccess} from '../user/index';

export const fetchFriendsSuccess = (friendList) => {
  return {
    type: t.FETCH_FRIENDS_SUCCESS,
    friendList: friendList,
  }
};

export const changeFriendListPageNumber = (page) => {
  return {
    type: t.CHANGE_FRIEND_LIST_PAGE_NUMBER,
    page,
  }
};

const followUserSuccess = (newFriends) => {
  return {
    type: t.FOLLOW_USER_SUCCESS,
    newFriends
  }
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
        console.log("follower user response", response);
        return response;
      })
};

export const goToFriendsListPage = (router) => {
  return (dispatch) => {
    dispatch(onFetchFriends());
    router.push('/app/friends');
  }
};

export const onStartFollow = () => {
  return (dispatch, getState) => {
    const user = getState().user;
    
    if (!oneDayHasPassed(user.followedFriendsAt)) {
      const content = `每天只能手动添加好友一次，请明天再试`;
      
      return dispatch(globalMessageActions.showMessage({type: "warning", content: content}));
    } else {
      dispatch(followModalActions.followModalOpen());
      return followUsers(user)
          .then(({newFriends, user}) => {
            // throw new Error("manual break");
            // dispatch(clearMessageLoading());
            dispatch(followUserSuccess(newFriends));
            dispatch(userActions.userLoginSuccess(user));
            dispatch(followModalActions.followModalNextStep());
          })
          .catch(err => {
            console.error(err);
            dispatch(globalMessageActions.showMessage({type: "error", content: "添加好友失败"}));
            dispatch(followModalActions.followModalClose());
          });
      
    }
  };
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
        console.log("friendList", friendList);
        return friendList
      });
};

export const onFetchFriends = () => {
  return (dispatch, getState) => {
    // if (getState().friends.total) {
    //   return;
    // }
    dispatch(globalMessageActions.showMessage({type: "loading", content: "获得好友中"}));
    
    fetchFriends(getState().user)
        .then((friendList) => {
      
          dispatch(fetchFriendsSuccess(friendList));
          dispatch(globalMessageActions.clearMessageLoading());
        })
        .catch((error) => {
          console.error(error);
          dispatch(globalMessageActions.showMessage({type: "error", content: "获得好友中失败，请稍候再试"}));
        });
    
    /*dispatch(friendsUpdated(friends)*/
    // dispatch(clearMessageLoading());
  };
  
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