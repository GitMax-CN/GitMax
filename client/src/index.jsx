import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
// import Home from './Home.jsx';
import HOME from './Home/index.jsx';
import 'babel-polyfill';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {userLogin} from './actions/actions';
import GitMaxApp from './reducers/GitMaxApp';

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
  
  // fetch(...)
  //     .then(response = response.json())
  //     .then(userTeams => {
  //       if (userTeams.length === 0) {
  //         replace(`/users/${nextState.params.userId}/teams/new`)
  //       }
  //       callback();
  //     })
  //     .catch(error => {
  //       // do some error handling here
  //       callback(error);
  //     })
};

window.addEventListener("message", (event) => {
  const origin = event.origin || event.originalEvent.origin;
  console.log("origin", origin);
  if (origin){
    // store.dispatch(userLogin(event.token));
  }
}, false);

const router = (
    <Router history={hashHistory}>
      <Route path="/" component={HOME}>
        <IndexRoute component={HOME}/>
        <Route path="/authenticate/:token(/:scope)" onEnter={postToken}/>
        {/*<Route path="about" component={AboutPage}/>*/}
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