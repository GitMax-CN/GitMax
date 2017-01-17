import reducer from './reducer';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

// console.log("reducer", JSON.stringify(reducer));

const store = createStore(reducer, applyMiddleware(thunk));
export default store;

import * as initialConfigModalActions from "./initialConfigModal";
import * as followModalActions from "./followModal";
import * as globalMessageActions from "./globalMessage";
import * as userActions from "./user";
import * as friendsActions from "./friends";

export {initialConfigModalActions, followModalActions, globalMessageActions, userActions, friendsActions};


