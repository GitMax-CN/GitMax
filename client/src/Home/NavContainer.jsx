import {userLogin, userLogout} from '../actions'
import {connect} from 'react-redux';
import Nav from './Nav';

const mapStateToProps = (state, ownProps) => {
  'use strict';
  console.log("ownProps", ownProps);
  return {
    user: state.user,
    ...ownProps
  }
};

const mapDispatchToProps = (dispatch) => {
  'use strict';
  return {
    onUserLogin: () => dispatch(userLogin()),
    onUserLogout: ()=> dispatch(userLogout())
  }
};

const NavContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav);

export default NavContainer;