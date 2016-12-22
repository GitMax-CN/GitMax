const userBase = {
  isLogging: false
};

const gitMaxApp = (state = [], action) => {
  switch (action.type) {
    case "USER_LOGIN_START":
      console.log("USER_LOGIN start");
      return state;
      
    case "USER_LOGIN_SUCCESS":
      console.log("USER_LOGIN_SUCCESS, action.user", action.user);
      let newUser = Object.assign({},
          {user: userBase},
          action.user
      );
      return Object.assign({},
          state,
          {user: newUser});
  
    case "USER_LOGIN_FAIL":
      console.log("USER_LOGIN fail, action.error", action.errorMessage);
      console.log("USER_LOGIN start");
      return state;
      
    case "USER_LOGOUT":
      return Object.assign({},
          state,
          {user: userBase}
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
