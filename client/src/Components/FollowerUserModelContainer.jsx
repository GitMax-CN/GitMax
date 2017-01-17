import {connect} from 'react-redux';
import {followModalActions, globalMessageActions} from '../modules';
import FollowerUserModal from './FollowerUserModal';
const mapStateToProps = (state, ownProps) => {
  // console.log("state", state);
  return {
    // isFollowing: state.isFollowing,
    // userLogin: state.user ? state.user.login : null,
    user: state.user,
    visible: state.userFollowModal.visible,
    // visible: true,
    current: state.userFollowModal.current,
    // current: 1,
    newFriends: state.newFriends,
    // newFriends: [{a:1},{b:2}],
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    // onCloseModal: () => dispatch(userAcknowledgeFollow()),
    followModalOpen: () => dispatch(followModalActions.followModalOpen()),
    followModalClose: () => dispatch(followModalActions.followModalClose()),
    showMessage: (message) => dispatch(globalMessageActions.showMessage(message)),
  }
};

const FollowerUserModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FollowerUserModal);

export default FollowerUserModalContainer;