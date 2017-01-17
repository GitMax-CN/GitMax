import React from 'react';
import {connect} from 'react-redux';
import FollowerConfig from './FollowerConfig';
import {friendsActions} from '../modules';

const mapStateToProps = (state, ownProps) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStartFollow: () => dispatch(friendsActions.onStartFollow()),
  }
};

const FollowerConfigContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FollowerConfig);

export default FollowerConfigContainer;