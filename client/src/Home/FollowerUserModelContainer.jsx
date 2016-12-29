import {connect} from 'react-redux';
import {
  followModalOpen,
  followModalClose,
  onFollowModalNextStep,
  followModalPrevStep
} from '../actions/actions';
import FollowerUserModal from './FollowerUserModal';
const mapStateToProps = (state, ownProps) => {
  return {
    // isFollowing: state.isFollowing,
    // userLogin: state.user ? state.user.login : null,
    user: state.user,
    visible: state.userFollowModal.visible,
    current: state.userFollowModal.current,
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    // onCloseModal: () => dispatch(userAcknowledgeFollow()),
    followModalOpen: () => dispatch(followModalOpen()),
    followModalClose: () => dispatch(followModalClose()),
    followModalPrevStep: () => dispatch(followModalPrevStep()),
    followModalNextStep: (current, data) => dispatch(onFollowModalNextStep(current, data)),
  }
};

const FollowerUserModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FollowerUserModal);

export default FollowerUserModalContainer;