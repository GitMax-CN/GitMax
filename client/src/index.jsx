import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
// import Home from './Home.jsx';
import HOME from './Home/index.jsx';
import firebaseConfig from './firebaseConf';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import GitMaxApp from './reducers/GitMaxApp';

firebaseConfig();

const store = createStore(
    GitMaxApp,
    applyMiddleware(thunk)
);

const router = (
    <Router history={hashHistory}>
      <Route path="/" component={HOME}>
        {/*<IndexRoute component={Edit}/>*/}
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