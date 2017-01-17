const userBase = {
  isLogging: false,
  isFollowing: false,
  addFollowersNow: 12,
  addFollowersMax: 100,
  crit_FollowersCount: 0,
  crit_StargazersCount: 0,
  followedFriendsAt: null,
  max_created_at: null,
  maxFriendCount: 0,
};

export const initialState = {
  user: userBase,
  initialConfigModal: {
    visible: false,
  },
  userFollowModal: {
    visible: false,
    current: 0,//1,2
  },
  friends: {
    isFetching: false,
    page: 1,
    list: [],
  },
  newFriends:[],
  message: {
    type: null,
    content: null,
    loadingFinish: true,
  }
};

const gitMaxApp = (state = initialState, action) => {
  let newUser,
      newCurrent,
      newUserFollowModal,
      newInitialConfigModal,
      newFriends;
  
  switch (action.type) {
    // case "USER_LOGIN_START":
    //   console.log("USER_LOGIN start");
    //   newUser = Object.assign({}, userBase, {isLogging: true});
    //
    //   return Object.assign({}, state, {user: newUser});
    //
    // case "USER_LOGIN_SUCCESS":
    // case "USER_UPDATE_SUCCESS":
    //   console.log("USER_LOGIN_SUCCESS, action.user", action.user);
    //   newUser = Object.assign({},
    //       state.user,
    //       action.user
    //   );
    //   return Object.assign({},
    //       state,
    //       {user: newUser});
    //
    // case "USER_LOGIN_FAIL":
    //   console.log("USER_LOGIN fail, action.error", action.errorMessage);
    //   return Object.assign({},
    //       state,
    //       {user: userBase}
    //   );
    //
    // case "USER_LOGOUT_START":
    //   console.log("USER_LOGOUT_START");
    //   newUser = Object.assign({}, userBase, {isLogging: true});
    //   return Object.assign({}, state, {user: newUser});
    //
    // case "USER_LOGOUT_SUCCESS":
    //   console.log("USER_LOGOUT_SUCCESS");
    //   return Object.assign({},
    //       state,
    //       {user: userBase}
    //   );
    
    case "FOLLOW_USER_START":
      return Object.assign({},
          state,
          {isFollowing: true}
      );
    
    // case "USER_ACKNOWLEDGE_FOLLOW":
    case "FOLLOW_USER_SUCCESS":
      console.log("FOLLOW_USER_SUCCESS");
      // console.log("action.newFriends", JSON.stringify(action.newFriends));
      console.log("action.newFriends", action.newFriends);
      return Object.assign({},
          state,
          {
            isFollowing: false,
            newFriends: action.newFriends,
          }
      );
    
    case "FOLLOW_USER_FAIL":
      console.log("FOLLOW_USER_FAIL");
      return Object.assign({},
          state,
          {isFollowing: true}
      );
  
  
  
  
  
  
  
  
  
  
  
  
    // case "CHANGE_FRIEND_LIST_PAGE_NUMBER":
    //   console.log("CHANGE_FRIEND_LIST_PAGE_NUMBER, action.page", action.page);
    //
    //   updateFriends = Object.assign({}, state.friends);
    //   updateFriends.page = action.page;
    //   return Object.assign({},
    //       state,
    //       {
    //         friends: updateFriends
    //       }
    //   );
  
    case "LOAD_NEXT_BUTTON":
      console.log("LOAD_NEXT_BUTTON", action);
      newUserFollowModal = Object.assign({}, state.userFollowModal, {nextBtnLoading: true});
      return Object.assign({}, state, newUserFollowModal);
      
  
    // case "FETCH_FRIENDS_SUCCESS":
    //   console.log("FETCH_FRIENDS_SUCCESS");
    //   console.log("action.friendList", action.friendList);
    //   newFriends = Object.assign({}, state.friends);
    //   newFriends.list = action.friendList;
    //   return Object.assign({},
    //       state,
    //       {
    //         friends: newFriends
    //       }
    //   );
      
    case "USER_REFRESH":
      console.log("USER_REFRESH start:", action.user);
      return Object.assign({},
          state,
          {user: action.user}
      );
    
    default:
      return state;
  }
};

export default gitMaxApp;
