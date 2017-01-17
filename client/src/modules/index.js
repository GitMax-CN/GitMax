import reducer from './reducer';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

// console.log("reducer", JSON.stringify(reducer));

const store = createStore(reducer, applyMiddleware(thunk));
export default store;

// import * as followModalActions from "./followModal";
export * as followModalActions from "./followModal";//检查小dux是否export正确
export * as globalMessageActions from "./globalMessage";
export * as userActions from "./user";//检查这种较大的dux，是否export正确
export * as friendsActions from "./friends";
export * as initialConfigModalActions from "./initialConfigModal";

