import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
// import Home from './Home.jsx';
import HOME from './Home/index.jsx';
import firebaseConfig from './firebaseConf';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import GitMaxApp from './reducers/GitMaxApp';

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

const store = createStore(GitMaxApp);

render(
    <Provider store={store}>
      {router}
    </Provider>,
    document.getElementById('app')
);