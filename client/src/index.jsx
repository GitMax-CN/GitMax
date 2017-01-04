import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import HOME from './Home/index.jsx';
import 'babel-polyfill';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import GitMaxApp from './reducers/GitMaxApp';
import App from './Home/App';
import FollowerConfig from './Home/FollowerConfig';
import FriendsList from './Home/FriendsList';

// import testFollowModal from './reducers/test';
// testFollowModal();

const store = createStore(
    GitMaxApp,
    applyMiddleware(thunk)
);

const postToken = (nextState, replace, callback) => {
  console.log("nextState", nextState);
  console.log("nextState.token", nextState.token);
  
  window.postMessage({
    token: nextState.token,
    scope: nextState.scope
  }, "*");// todo change this to specific urls - http://www.gitmax.cn, http://localhost:5000, etc
};

window.addEventListener("message", (event) => {
  const origin = event.origin || event.originalEvent.origin;
  console.log("origin", origin);
  if (origin) {
    // store.dispatch(userLogin(event.token));
  }
}, false);

const router = (
    <Router history={hashHistory}>
      <Route path="/" component={HOME}>
        
        {/*<Route path="/authenticate/:token(/:scope)" onEnter={postToken}/>*/}
        {/*<Route path="about" component={AboutPage}/>*/}
      </Route>
      <Route path="app" component={App}>
        <IndexRoute component={FollowerConfig}/>
        <Route path="addFollower" component={FollowerConfig}/>
        <Route path="friends" component={FriendsList}/>
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