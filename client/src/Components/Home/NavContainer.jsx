import {userLogin, userLogout, followModalOpen, clearMessage} from '../../actions/actions'
import {connect} from 'react-redux';
import Nav from './Nav';

const mapStateToProps = (state, ownProps) => {
  // console.log("state.user", state.user);
  // console.log("ownProps", ownProps);
  return {
    user: state.user,
    // message: {type:"success", content:"设置保存成功"},
    message: state.message,
    ...ownProps
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserLogin: () => dispatch(userLogin()),
    onUserLogout: ()=> dispatch(userLogout()),
    followModalOpen: () => dispatch(followModalOpen()),
    clearMessage: () => dispatch(clearMessage()),
  }
};

const NavContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav);

export default NavContainer;