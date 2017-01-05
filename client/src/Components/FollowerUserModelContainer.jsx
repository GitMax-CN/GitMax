import {connect} from 'react-redux';
import {
  followModalOpen,
  followModalClose,
  onFollowModalNextStep,
  followModalPrevStep,
  showMessage
} from '../actions/actions';
import FollowerUserModal from './FollowerUserModal';
const mapStateToProps = (state, ownProps) => {
  return {
    // isFollowing: state.isFollowing,
    // userLogin: state.user ? state.user.login : null,
    user: state.user,
    crit_FollowersCount: state.user.crit_FollowersCount,
    crit_StargazersCount: state.user.crit_StargazersCount,
    addFollowersNow: state.user.addFollowersNow,
    addFollowersMax: state.user.addFollowersMax,
    visible: state.userFollowModal.visible,
    // visible: true,
    current: state.userFollowModal.current,
    // current: 2,
    nextBtnLoading: state.userFollowModal.nextBtnLoading,
    newFriends: state.newFriends,
    // newFriends: [],
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    // onCloseModal: () => dispatch(userAcknowledgeFollow()),
    followModalOpen: () => dispatch(followModalOpen()),
    followModalClose: () => dispatch(followModalClose()),
    followModalPrevStep: () => dispatch(followModalPrevStep()),
    followModalNextStep: (current, data) => dispatch(onFollowModalNextStep(current, data)),
    showMessage: (message) => dispatch(showMessage(message)),
  }
};

const FollowerUserModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FollowerUserModal);

export default FollowerUserModalContainer;