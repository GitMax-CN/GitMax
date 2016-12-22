const gitMaxApp = (state = [], action) => {
  switch (action.type) {
    case "USER_LOGIN_START":
      console.log("USER_LOGIN start");
      return state;
    case "USER_LOGIN_SUCCESS":
      console.log("USER_LOGIN_SUCCESS, action.user", action.user);
      return state;
    case "USER_LOGIN_FAIL":
      console.log("USER_LOGIN fail, action.error", action.error);
      console.log("USER_LOGIN start");
      return state;
    case "USER_LOGOUT":
      console.log("USER_LOGOUT");
      return state;
    case "ADD_FOLLOWERS":
      console.log("ADD_FOLLOWERS update state");
      return state;
    default:
      return state;
  }
};

export default gitMaxApp;
