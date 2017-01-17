import {combineReducers} from 'redux';
import followModalReducer from './followModal';
import globalMessageReducer from './globalMessage';
import userReducer from './user';
import initialConfigModalReducer from './initialConfigModal';
import newFriendsReducer from './newFriends';
import friendsReducer from './friends';

const reducer = combineReducers({
  user: userReducer,
  initialConfigModal: initialConfigModalReducer,
  userFollowModal: followModalReducer,
  newFriends: newFriendsReducer,
  message: globalMessageReducer,
  friends: friendsReducer,
});

// console.log("reducer.js", reducer);

export default reducer;




