const userBase = {
  isLogging: false,
  isFollowing: false,
  addFollowersNow: 99,
  addFollowersMax: 5000,
  crit_FollowersCount: 0,
  crit_StargazersCount: 0,
  lastTimeFollow: null,
};

export const initialState = {
  user: userBase,
  userFollowModal: {
    visible: false,
    current: 0,
  },
  followers: {
    isFetching: false,
    list:[],
  }
};

const gitMaxApp = (state = initialState, action) => {
  let newUser;
  let newCurrent;
  
  switch (action.type) {
    case "USER_LOGIN_START":
      console.log("USER_LOGIN start");
      newUser = Object.assign({}, userBase, {isLogging: true});
      
      return Object.assign({}, state, {user: newUser});
    
    case "USER_LOGIN_SUCCESS":
      console.log("USER_LOGIN_SUCCESS, action.user", action.user);
      newUser = Object.assign({},
          {user: userBase},
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
    
    case "USER_LOGOUT":
      console.log("USER_LOGOUT");
      return Object.assign({},
          state,
          {user: userBase}
      );
    
    case "FOLLOW_USER_START":
      return Object.assign({},
          state,
          {isFollowing: true}
      );
    case "FOLLOW_USER_SUCCESS":
    case "USER_ACKNOWLEDGE_FOLLOW":
      return Object.assign({},
          state,
          {isFollowing: false}
      );
    
    case "FOLLOW_MODAL_OPEN":
      console.log("FOLLOW_MODAL_OPEN");
      return Object.assign({}, state, {userFollowModal: {visible: true, current: 0,}});
    case "FOLLOW_MODAL_CLOSE":
      console.log("FOLLOW_MODAL_CLOSE");
      return Object.assign({}, state, {userFollowModal: {visible: false, current: 0,}});
    case "FOLLOW_NEXT_STEP":
      console.log("FOLLOW_NEXT_STEP");
      newCurrent = state.userFollowModal.current + 1;
      return Object.assign({}, state, {userFollowModal: {visible: true, current: newCurrent,}});
      
    case "FOLLOW_PREV_STEP":
      console.log("FOLLOW_PREV_STEP");
      newCurrent = state.userFollowModal.current - 1;
      return Object.assign({}, state, {userFollowModal: {visible: true, current: newCurrent,}});
      
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
