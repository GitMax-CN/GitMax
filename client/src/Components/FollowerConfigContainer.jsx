import React from 'react';
import {connect} from 'react-redux';
import FollowerConfig from './FollowerConfig';
import {onStartFollow, followModalPrevStep, onFollowModalNextStep, showMessage, saveConfigIfChanged} from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
  // console.log("state.user", state.user);
  // console.log("ownProps", ownProps);
  return {
    // user: state.user,
    // crit_FollowersCount: state.user.crit_FollowersCount,
    // crit_StargazersCount: state.user.crit_StargazersCount,
    // addFollowersNow: state.user.addFollowersNow,
    // addFollowersMax: state.user.addFollowersMax,
    // message: {type:"success", content:"设置保存成功"},
    // message: state.message,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStartFollow: () => dispatch(onStartFollow()),
    // followModalPrevStep: () => dispatch(followModalPrevStep()),
    // followModalNextStep: (current, data) => dispatch(onFollowModalNextStep(current, data)),
    // showMessage: (message) => dispatch(showMessage(message)),
    // saveConfigIfChanged: (data) => dispatch(saveConfigIfChanged(data))
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