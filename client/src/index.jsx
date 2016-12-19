import React from 'react';
import {render} from 'react-dom';
import PageNotFound from './PageNotFound.jsx';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';

class App extends React.Component {
  render () {
    return <div>
      <p> Hello React! </p>
      {this.props.children}
    </div>
  }
}

const router = (
      <Router history={hashHistory}>
        {/*<Router>*/}
      <Route path="/" component={App}>
        {/*<IndexRoute component={AuthSignInNew} onEnter={verifyNotLogin}/>*/}
        {/*<Route path="verify-email/:token" component={VerifyEmailTokenPage}/>*/}
        <Route path="nn" component={PageNotFound}/>
        <Route path="*" component={PageNotFound}/>
      </Route>
    </Router>
);

render(router, document.getElementById('app'));