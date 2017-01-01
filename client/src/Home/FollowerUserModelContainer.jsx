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
    current: state.userFollowModal.current,
    // current: 2,
    nextBtnLoading: state.userFollowModal.nextBtnLoading,
    newFriends: state.newFriends,
    // newFriends: [{"id":23350242,"url":"https://api.github.com/users/StephenFinn2","avatar_url":"https://avatars.githubusercontent.com/u/23350242?v=3","login":"StephenFinn2"},{"id":24619204,"url":"https://api.github.com/users/GitMaxBot","avatar_url":"https://avatars.githubusercontent.com/u/24619204?v=3","login":"GitMaxBot"},{"id":24801736,"url":"https://api.github.com/users/qqqianqq","avatar_url":"https://avatars.githubusercontent.com/u/24801736?v=3","login":"qqqianqq"},{"id":24727952,"url":"https://api.github.com/users/Ryan-Page","avatar_url":"https://avatars.githubusercontent.com/u/24727952?v=3","login":"Ryan-Page","name":"Ryan Page"}, {"id":23350242,"url":"https://api.github.com/users/StephenFinn2","avatar_url":"https://avatars.githubusercontent.com/u/23350242?v=3","login":"StephenFinn2"},{"id":24619204,"url":"https://api.github.com/users/GitMaxBot","avatar_url":"https://avatars.githubusercontent.com/u/24619204?v=3","login":"GitMaxBot"},{"id":24801736,"url":"https://api.github.com/users/qqqianqq","avatar_url":"https://avatars.githubusercontent.com/u/24801736?v=3","login":"qqqianqq"},{"id":24727952,"url":"https://api.github.com/users/Ryan-Page","avatar_url":"https://avatars.githubusercontent.com/u/24727952?v=3","login":"Ryan-Page","name":"Ryan Page"}, {"id":23350242,"url":"https://api.github.com/users/StephenFinn2","avatar_url":"https://avatars.githubusercontent.com/u/23350242?v=3","login":"StephenFinn2"},{"id":24619204,"url":"https://api.github.com/users/GitMaxBot","avatar_url":"https://avatars.githubusercontent.com/u/24619204?v=3","login":"GitMaxBot"}, {"id":23350242,"url":"https://api.github.com/users/StephenFinn2","avatar_url":"https://avatars.githubusercontent.com/u/23350242?v=3","login":"StephenFinn2"},{"id":24619204,"url":"https://api.github.com/users/GitMaxBot","avatar_url":"https://avatars.githubusercontent.com/u/24619204?v=3","login":"GitMaxBot"},{"id":24801736,"url":"https://api.github.com/users/qqqianqq","avatar_url":"https://avatars.githubusercontent.com/u/24801736?v=3","login":"qqqianqq"},{"id":24727952,"url":"https://api.github.com/users/Ryan-Page","avatar_url":"https://avatars.githubusercontent.com/u/24727952?v=3","login":"Ryan-Page","name":"Ryan Page"}, {"id":23350242,"url":"https://api.github.com/users/StephenFinn2","avatar_url":"https://avatars.githubusercontent.com/u/23350242?v=3","login":"StephenFinn2"},{"id":24619204,"url":"https://api.github.com/users/GitMaxBot","avatar_url":"https://avatars.githubusercontent.com/u/24619204?v=3","login":"GitMaxBot"},{"id":24801736,"url":"https://api.github.com/users/qqqianqq","avatar_url":"https://avatars.githubusercontent.com/u/24801736?v=3","login":"qqqianqq"},{"id":24727952,"url":"https://api.github.com/users/Ryan-Page","avatar_url":"https://avatars.githubusercontent.com/u/24727952?v=3","login":"Ryan-Page","name":"Ryan Page"}, {"id":23350242,"url":"https://api.github.com/users/StephenFinn2","avatar_url":"https://avatars.githubusercontent.com/u/23350242?v=3","login":"StephenFinn2"},{"id":24619204,"url":"https://api.github.com/users/GitMaxBot","avatar_url":"https://avatars.githubusercontent.com/u/24619204?v=3","login":"GitMaxBot"}],
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