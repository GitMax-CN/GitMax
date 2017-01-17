//Actions


//ActionCreators


//Reducer
const initialState = [];
//this reducer is triggered by friends.action
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FOLLOW_USER_SUCCESS":
      console.log("FOLLOW_USER_SUCCESS");
      // console.log("action.newFriends", JSON.stringify(action.newFriends));
      console.log("action.newFriends", action.newFriends);
      return action.newFriends;
    
    default:
      return state;
  }
}




