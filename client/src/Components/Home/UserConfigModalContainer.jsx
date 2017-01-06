import {connect} from 'react-redux';
import {
  onInitialModalSave,
} from '../../actions/actions';
import UserConfigModal from './UserConfigModal';
const mapStateToProps = (state, ownProps) => {
  return {
    // isFollowing: state.isFollowing,
    // userLogin: state.user ? state.user.login : null,
    user: state.user,
    crit_FollowersCount: state.user.crit_FollowersCount,
    crit_StargazersCount: state.user.crit_StargazersCount,
    addFollowersNow: state.user.addFollowersNow,
    addFollowersMax: state.user.addFollowersMax,
    visible: state.initialConfigModal.visible,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onInitialModalSave: (data) => dispatch(onInitialModalSave(data, ownProps.router)),
  }
};

const UserConfigModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserConfigModal);

export default UserConfigModalContainer;