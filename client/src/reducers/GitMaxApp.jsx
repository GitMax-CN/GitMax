const userBase = {
  isLogging: false,
  isFollowing: false
};

const gitMaxApp = (state = [], action) => {
  let newUser;
  
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
    
    case "USER_REFRESH":
      console.log("USER_REFRESH start:", action.user);
      return Object.assign({},
          state,
          {user: action.user}
      );
    
    case "ADD_FOLLOWERS":
      console.log("ADD_FOLLOWERS update state");
      return state;
    
    default:
      return state;
  }
};

export default gitMaxApp;
