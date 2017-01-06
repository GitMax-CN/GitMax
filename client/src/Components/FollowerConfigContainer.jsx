import React from 'react';
import {connect} from 'react-redux';
import FollowerConfig from './FollowerConfig';
import {onStartFollow, followModalPrevStep, onFollowModalNextStep, showMessage, saveConfigIfChanged} from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStartFollow: () => dispatch(onStartFollow()),
  }
};

const FollowerConfigContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FollowerConfig);

export default FollowerConfigContainer;