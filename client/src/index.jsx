import React from 'react';
import {render} from 'react-dom';
import PageNotFound from './PageNotFound.jsx';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import App from './App.jsx';
// import Home from './Home.jsx';
import Edit from './Edit.jsx';
import AboutPage from './AboutPage.jsx';
import HOME from './Home/index.jsx';
import firebaseConfig from './firebaseConf';

firebaseConfig();

const router = (
    <Router history={hashHistory}>
      <Route path="/" component={HOME}>
        {/*<IndexRoute component={Edit}/>*/}
        {/*<Route path="about" component={AboutPage}/>*/}
      </Route>
      {/*<Route path="*" component={PageNotFound}/>*/}
    </Router>
);

render(router, document.getElementById('app'));