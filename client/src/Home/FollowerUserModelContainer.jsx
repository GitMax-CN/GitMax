import {connect} from 'react-redux';
import {userAcknowledgeFollow} from '../actions/actions';
import FollowerUserModal from './FollowerUserModal';
const mapStateToProps = (state, ownProps) => {
  return {
    isFollowing: state.isFollowing,
    userLogin: state.user ? state.user.login : null,
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    onCloseModal: () => dispatch(userAcknowledgeFollow())
  }
};

const FollowerUserModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FollowerUserModal);

export default FollowerUserModalContainer;