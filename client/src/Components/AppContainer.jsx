import {connect} from 'react-redux';
import {userLogout, goToFriendsListPage} from '../actions/actions';
import App from './App';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    goToFriendsListPage: (router) => dispatch(goToFriendsListPage(router)),
  }
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;