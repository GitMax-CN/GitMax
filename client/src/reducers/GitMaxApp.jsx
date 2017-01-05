const userBase = {
  isLogging: false,
  isFollowing: false,
  addFollowersNow: 99,
  addFollowersMax: 5000,
  crit_FollowersCount: 0,
  crit_StargazersCount: 0,
  followedFriendsAt: null,
  max_created_at: null,
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
    case "USER_LOGIN_START":
      console.log("USER_LOGIN start");
      newUser = Object.assign({}, userBase, {isLogging: true});
      
      return Object.assign({}, state, {user: newUser});
    
    case "USER_LOGIN_SUCCESS":
    case "USER_UPDATE_SUCCESS":
      console.log("USER_LOGIN_SUCCESS, action.user", action.user);
      newUser = Object.assign({},
          state.user,
          action.user
      );
      return Object.assign({},
          state,
          {user: newUser});
    
    case "USER_LOGIN_FAIL":
      console.log("USER_LOGIN fail, action.error", action.errorMessage);
      return Object.assign({},
          state,
          {user: userBase}
      );
  
    case "USER_LOGOUT_START":
      console.log("USER_LOGOUT_START");
      newUser = Object.assign({}, userBase, {isLogging: true});
      return Object.assign({}, state, {user: newUser});
      
    case "USER_LOGOUT_SUCCESS":
      console.log("USER_LOGOUT_SUCCESS");
      return Object.assign({},
          state,
          {user: userBase}
      );
    
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
    
    
    case "FOLLOW_MODAL_OPEN":
      console.log("FOLLOW_MODAL_OPEN");
      return Object.assign({}, state, {userFollowModal: {visible: true, current: 0,}});
      
    case "FOLLOW_MODAL_CLOSE":
      console.log("FOLLOW_MODAL_CLOSE");
      return Object.assign({}, state, {userFollowModal: {visible: false, current: state.userFollowModal.current}});
  
    case "INITIAL_CONFIG_MODAL_OPEN":
      console.log("INITIAL_CONFIG_MODAL_OPEN");
      return Object.assign({}, state, {initialConfigModal: {visible: true}});
  
    case "INITIAL_CONFIG_MODAL_CLOSE":
      console.log("INITIAL_CONFIG_MODAL_CLOSE");
      return Object.assign({}, state, {initialConfigModal: {visible: false}});
      
    case "FOLLOW_NEXT_STEP":
      console.log("FOLLOW_NEXT_STEP");
      newCurrent = state.userFollowModal.current + 1;
      return Object.assign({}, state, {userFollowModal: {visible: true, current: newCurrent}});
    
    case "FOLLOW_PREV_STEP":
      console.log("FOLLOW_PREV_STEP");
      newCurrent = state.userFollowModal.current - 1;
      return Object.assign({}, state, {userFollowModal: {visible: true, current: newCurrent}});
  
    case "LOAD_NEXT_BUTTON":
      console.log("LOAD_NEXT_BUTTON", action);
      newUserFollowModal = Object.assign({}, state.userFollowModal, {nextBtnLoading: true});
      return Object.assign({}, state, newUserFollowModal);
      
    case "GLOBAL_MESSAGE_SHOW":
      console.log("GLOBAL_MESSAGE_SHOW", action.msg);
      return Object.assign({}, state, {message: action.msg});
  
    case "GLOBAL_MESSAGE_CLEAR":
      console.log("GLOBAL_MESSAGE_CLEAR");
      return Object.assign({}, state, {message: {
        type: null,
        content: null,
        loadingFinish: state.message.loadingFinish
      }});
  
    case "GLOBAL_MESSAGE_LOADING_SHOW":
      console.log("GLOBAL_MESSAGE_SHOW", action.msg);
      let message = Object.assign({}, action.msg, {loadingFinish: false});
      return Object.assign({}, state, {message: message});
      
    case "GLOBAL_MESSAGE_LOADING_CLEAR":
      console.log("GLOBAL_MESSAGE_LOADING_CLEAR");
      return Object.assign({}, state, {message: {
        type: state.message.type,
        content: state.message.content,
        loadingFinish: true
      }});
  
    case "FETCH_FRIENDS_SUCCESS":
      console.log("FETCH_FRIENDS_SUCCESS");
      console.log("action.friendList", action.friendList);
      newFriends = Object.assign({}, state.friends);
      newFriends.list = action.friendList;
      return Object.assign({},
          state,
          {
            friends: newFriends
          }
      );
      
    case "CHANGE_FRIEND_LIST_PAGE_NUMBER":
      console.log("CHANGE_FRIEND_LIST_PAGE_NUMBER, action.page", action.page);
      
      newFriends = Object.assign({}, state.friends);
      newFriends.page = action.page;
      return Object.assign({},
          state,
          {
            friends: newFriends
          }
      );
      
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
