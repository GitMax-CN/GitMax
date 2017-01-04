import React from 'react';
import {connect} from 'react-redux';
import FollowerConfig from './FollowerConfig';

const mapStateToProps = (state, ownProps) => {
  // console.log("state.user", state.user);
  // console.log("ownProps", ownProps);
  return {
    user: state.user,
    // message: {type:"success", content:"设置保存成功"},
    // message: state.message,
    ...ownProps
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onUserLogin: () => dispatch(userLogin()),
    // onUserLogout: ()=> dispatch(userLogout()),
    // followModalOpen: () => dispatch(followModalOpen()),
    // clearMessage: () => dispatch(clearMessage()),
  }
};

const FollowerConfigContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FollowerConfig);

export default FollowerConfigContainer;