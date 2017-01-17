import React from 'react';
import {connect} from 'react-redux';
import EditableTable from './EditableTable';
import {userActions} from '../modules';

const mapStateToProps = (state, ownProps) => {
  // console.log("state.user", state.user);
  // console.log("ownProps", ownProps);
  return {
    user: state.user,
    crit_FollowersCount: state.user.crit_FollowersCount,
    crit_StargazersCount: state.user.crit_StargazersCount,
    addFollowersNow: state.user.addFollowersNow,
    addFollowersMax: state.user.addFollowersMax,
    ...ownProps
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveConfigIfChanged: (data) => dispatch(userActions.saveConfigIfChanged(data)),
  }
};

const EditableTableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditableTable);

export default EditableTableContainer;