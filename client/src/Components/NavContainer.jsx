import {userActions, globalMessageActions, followModalActions} from '../modules';
import {connect} from 'react-redux';
import Nav from './Nav';

const mapStateToProps = (state, ownProps) => {
  const style = {
    fixed: {backgroundColor: '#ffffff', position: 'fixed'},
    static: {backgroundColor: '#ffffff', boxShadow: "none", marginBottom: "24px"},
  };
  const navStyle = ownProps.router.location.pathname === "/" ? style.fixed : style.static;
  
  return {
    user: state.user,
    navStyle: navStyle,
    // message: {type:"success", content:"设置保存成功"},
    message: state.message,
    ...ownProps
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onUserLogin: () => dispatch(userActions.userLogin(ownProps.router)),
    onUserLogout: ()=> dispatch(userActions.userLogout()),
    followModalOpen: () => dispatch(followModalActions.followModalOpen()),
    clearMessage: () => dispatch(globalMessageActions.clearMessage()),
  }
};

let NavContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav);

export default NavContainer;