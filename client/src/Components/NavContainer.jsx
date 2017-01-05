import {userLogin, userLogout, followModalOpen, clearMessage, clearMessageLoading} from '../actions/actions'
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
    onUserLogin: () => dispatch(userLogin(ownProps.router)),
    onUserLogout: ()=> dispatch(userLogout()),
    followModalOpen: () => dispatch(followModalOpen()),
    clearMessage: () => dispatch(clearMessage()),
    clearMessageLoading: () => dispatch(clearMessageLoading()),
  }
};

let NavContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav);
 
export default NavContainer;