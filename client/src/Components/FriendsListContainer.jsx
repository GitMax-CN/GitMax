import React from 'react';
import {connect} from 'react-redux';
import FriendsList from './FriendsList';
import {onFetchFriends} from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    friends: state.friends
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchFriends: () => dispatch(onFetchFriends()),
  }
};

const FriendsListContainer = connect (
    mapStateToProps,
    mapDispatchToProps
)(FriendsList);

export default FriendsListContainer;