const initialState = {
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

export default function reducer(state = initialState, action){
  switch(action.type){
    case "USER_LOGIN_START":
      console.log("USER_LOGIN start");
      return Object.assign({}, state, {isLogging: true});
    
    case "USER_LOGIN_SUCCESS":
    case "USER_UPDATE_SUCCESS":
      console.log("USER_LOGIN_SUCCESS, action.user", action.user);
      return Object.assign({},
          action.user,
      );
  
    case "USER_LOGIN_FAIL":
      console.log("USER_LOGIN fail, action.error", action.errorMessage);
      return initialState;
  
    case "USER_LOGOUT_START":
      console.log("USER_LOGOUT_START");
      return Object.assign({}, state, {isLogging: true});
  
    case "USER_LOGOUT_SUCCESS":
      console.log("USER_LOGOUT_SUCCESS");
      return initialState;
      
    default : return state;
  }
}




