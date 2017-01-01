import {userLogin, userLogout, followModalOpen} from '../actions/actions'
import {connect} from 'react-redux';
import Nav from './Nav';

const mapStateToProps = (state, ownProps) => {
  // console.log("state.user", state.user);
  // console.log("ownProps", ownProps);
  return {
    user: state.user,
    ...ownProps
  }
};

const mapDispatchToProps = (dispatch) => {
  
  return {
    onUserLogin: () => dispatch(userLogin()),
    onUserLogout: ()=> dispatch(userLogout()),
    followModalOpen: () => dispatch(followModalOpen()),
  }
};

const NavContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav);

export default NavContainer;