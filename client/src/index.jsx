import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import 'babel-polyfill';
import App from './Components/App';

if (process.env.NODE_ENV === "production") {
  console = console || {};
  console.log = function () {
  };
}

const router = (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
      </Route>
    </Router>
);

render(
    router,
    document.getElementById('app')
);