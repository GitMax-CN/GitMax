import gitMaxApp, {initialState} from '../reducers/GitMaxApp';
import {createStore} from 'redux';
import {followModalOpen, followModalClose, followModalNextStep, followModalPrevStep} from '../actions/actions';

let store;

export const testFollowModal = () => {
  store = createStore(gitMaxApp);
  let state = Object.assign({}, initialState);
  
  // store.dispatch({followModalClose());
  store.dispatch(followModalClose());
  console.assert(equal(state, store.getState()));
  
  state.userFollowModal.visible = false;
  // store.dispatch({followModalClose());
  store.dispatch(followModalClose());
  console.assert(equal(state, store.getState()));
  
  state.userFollowModal.visible = true;
  // store.dispatch(followModalClose());
  store.dispatch(followModalOpen());
  console.assert(equal(state, store.getState()));
  
  state.userFollowModal.visible = true;
  store.dispatch(followModalOpen());
  console.assert(equal(state, store.getState()));
  
  state.userFollowModal.visible = false;
  store.dispatch(followModalClose());
  console.assert(equal(state, store.getState()));

  state.userFollowModal.visible = true;
  store.dispatch(followModalOpen());
  console.assert(equal(state, store.getState()));

  state.userFollowModal.current += 1;
  store.dispatch(followModalNextStep());
  console.assert(equal(state, store.getState()));

  state.userFollowModal.current += 1;
  store.dispatch(followModalNextStep());
  console.assert(equal(state, store.getState()));

  state.userFollowModal.current += 1;
  store.dispatch(followModalNextStep());
  console.assert(equal(state, store.getState()));

  state.userFollowModal.current -= 1;
  store.dispatch(followModalPrevStep());
  console.assert(equal(state, store.getState()));
  
  state.userFollowModal.current -= 1;
  store.dispatch(followModalPrevStep());
  console.assert(equal(state, store.getState()));

  state.userFollowModal.current -= 1;
  store.dispatch(followModalPrevStep());
  console.assert(equal(state, store.getState()));

  state.userFollowModal.current -= 1;
  store.dispatch(followModalPrevStep());
  console.assert(equal(state, store.getState()));
  
  state.userFollowModal.visible = false; state.userFollowModal.current = 0;
  store.dispatch(followModalClose());
  console.assert(equal(state, store.getState()));
  
  state.userFollowModal.visible = true;
  store.dispatch(followModalOpen());
  console.assert(equal(state, store.getState()));
  
  state.userFollowModal.current -= 1;
  store.dispatch(followModalPrevStep());
  console.assert(equal(state, store.getState()));

  state.userFollowModal.current -= 1;
  store.dispatch(followModalPrevStep());
  console.assert(equal(state, store.getState()));
};

const equal = (a,b) => {
  if (JSON.stringify(a) !== JSON.stringify(b)) {
    console.log("Not equal:");
    console.log(JSON.stringify(a));
    console.log(JSON.stringify(b));
  }
  else return JSON.stringify(a) === JSON.stringify(b);
};

// export default test;



// FOLLOW_MODAL_OPEN
// FOLLOW_MODAL_CLOSE
// FOLLOW_NEXT_STEP
// FOLLOW_PREV_STEP
// USER_LOGIN_START
// USER_LOGIN_SUCCESS
// USER_LOGIN_FAIL
// USER_LOGOUT
// FOLLOW_USER_START
// FOLLOW_USER_SUCCESS
// USER_ACKNOWLEDGE_FOLLOW
// USER_REFRESH
// ADD_FOLLOWERS