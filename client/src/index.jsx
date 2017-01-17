import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import HOME from './Components/Home/index.jsx';
import 'babel-polyfill';
import {Provider} from 'react-redux';
import store from './modules/index';
import AppContainer from './Components/AppContainer';
import FriendsListContainer from './Components/FriendsListContainer';
import FollowerConfigContainer from './Components/FollowerConfigContainer';
import config from "../config";

if (config.getStage()==="production"){
  console = console || {};
  console.log = function(){};
}

const requireLogin = (nextState, replace, callback) => {
  const state = store.getState();
  if (!state.user.id) {
    replace('/');
    callback();
  } else {
    callback();
  }
  // console.log("nextState", nextState);
  // console.log("requires login!");//Todo implement require login
};

const router = (
    <Router history={hashHistory}>
      <Route path="/" component={HOME}>
        
        {/*<Route path="/authenticate/:token(/:scope)" onEnter={postToken}/>*/}
        {/*<Route path="about" component={AboutPage}/>*/}
      </Route>
      <Route path="app" component={AppContainer} onEnter={requireLogin}>
        <IndexRoute component={FollowerConfigContainer}/>
        <Route path="addFollower" component={FollowerConfigContainer}/>
        <Route path="friends" component={FriendsListContainer}/>
      </Route>
      {/*<Route path="*" component={PageNotFound}/>*/}
    </Router>
);

render(
    <Provider store={store}>
      {router}
    </Provider>,
    document.getElementById('app')
);