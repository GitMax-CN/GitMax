import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import HOME from './Components/Home/index.jsx';
import 'babel-polyfill';
import {Provider} from 'react-redux';
import store from './modules/index';
import App from './Components/App';
// import FriendsListContainer from './Components/FriendsListContainer';
// import FollowerConfigContainer from './Components/FollowerConfigContainer';

if (process.env.NODE_ENV === "production") {
  console = console || {};
  console.log = function () {
  };
}

const router = (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        
        {/*<Route path="/authenticate/:token(/:scope)" onEnter={postToken}/>*/}
        {/*<Route path="about" component={AboutPage}/>*/}
      </Route>
      {/*<Route path="app" component={App}>*/}
        {/*<IndexRoute component={FollowerConfigContainer}/>*/}
        {/*<Route path="addFollower" component={FollowerConfigContainer}/>*/}
        {/*<Route path="friends" component={FriendsListContainer}/>*/}
      {/*</Route>*/}
      {/*<Route path="*" component={PageNotFound}/>*/}
    </Router>
);

render(
    <Provider store={store}>
      {router}
    </Provider>,
    document.getElementById('app')
);