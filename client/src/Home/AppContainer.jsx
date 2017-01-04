import {connect} from 'react-redux';
import {userLogout} from '../actions/actions';
import App from './App';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserLogout: ()=> dispatch(userLogout()),
  }
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;