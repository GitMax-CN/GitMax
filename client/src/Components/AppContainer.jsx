import {connect} from 'react-redux';
import {friendsActions, userActions} from '../modules';
import App from './App';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    goToFriendsListPage: (router) => dispatch(friendsActions.goToFriendsListPage(router)),
    userLogout: () => dispatch(userActions.userLogout()),
  }
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;