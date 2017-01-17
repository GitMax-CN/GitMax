import {userActions, globalMessageActions} from './index';

//Actions
const INITIAL_CONFIG_MODAL_OPEN = "INITIAL_CONFIG_MODAL_OPEN";
const INITIAL_CONFIG_MODAL_CLOSE = "INITIAL_CONFIG_MODAL_CLOSE";

//ActionCreators
export const initialConfigModalOpen = () => {
  console.log("initialConfigModalOpen");
  return {type: INITIAL_CONFIG_MODAL_OPEN}
};
export const initialConfigModalClose = () => {
  return {type: INITIAL_CONFIG_MODAL_CLOSE}
};

export const onInitialModalSave = (data, router) => {
  return (dispatch, getState) => {
    dispatch(globalMessageActions.showMessage({type: "loading", content: "保存中"}));
    const user = getState().user;
    const newUser = Object.assign({}, user, data);
    return userActions.updateConfig(newUser)
        .then(user => {
          // console.log("user is updated ", user);
          dispatch(userActions.userUpdateSuccess(user));
          dispatch(globalMessageActions.clearMessageLoading());
          dispatch(globalMessageActions.showMessage({type: "success", content: "保存成功"}));
        })
        .then(() => {
          dispatch(initialConfigModalClose());
          setTimeout(() => router.push('/app/addFollower'), 500);//Let modal close before redirect
        })
        .catch(err => {
          console.error(err);
          dispatch(globalMessageActions.showMessage({type: "error", content: "保存出错，请重试"}));
        })
  }
};

//Reducer
const initialState = {
  visible: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "INITIAL_CONFIG_MODAL_OPEN":
      console.log("INITIAL_CONFIG_MODAL_OPEN");
      return Object.assign({}, state, {visible: true});
    
    case "INITIAL_CONFIG_MODAL_CLOSE":
      console.log("INITIAL_CONFIG_MODAL_CLOSE");
      return Object.assign({}, state, {visible: false});
    
    default:
      return state;
  }
}

