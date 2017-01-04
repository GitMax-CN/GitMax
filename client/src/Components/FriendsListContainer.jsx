import React from 'react';
import {connect} from 'react-redux';
import FriendsList from './FriendsList';

const mapStateToProps = (state, ownProps) => {
  return {
    friends: state.friends
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
};

const FriendsListContainer = connect (
    mapStateToProps,
    mapDispatchToProps
)(FriendsList);

export default FriendsListContainer;