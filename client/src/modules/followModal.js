// Actions
const FOLLOW_MODAL_OPEN = "FOLLOW_MODAL_OPEN";
const FOLLOW_MODAL_CLOSE = "FOLLOW_MODAL_CLOSE";
const FOLLOW_NEXT_STEP = "FOLLOW_NEXT_STEP";
const FOLLOW_PREV_STEP = "FOLLOW_PREV_STEP";

// ActionCreators
export const followModalOpen = () => {
  return {type: FOLLOW_MODAL_OPEN}
};
export const followModalClose = () => {
  return {type: FOLLOW_MODAL_CLOSE}
};

export const followModalNextStep = () => {
  return {type: FOLLOW_NEXT_STEP}
};
export const followModalPrevStep = () => {
  return {type: FOLLOW_PREV_STEP}
};

// Reducer
const initialState = {
  visible: false,
  current: 0,//1,2
};

export default function reducer(state = initialState, action) {
  let updateCurrent;
  
  switch (action.type) {
    case "FOLLOW_MODAL_OPEN":
      console.log("FOLLOW_MODAL_OPEN");
      return Object.assign({}, state, {visible: true, current: 0,});
    
    case "FOLLOW_MODAL_CLOSE":
      console.log("FOLLOW_MODAL_CLOSE");
      return Object.assign({}, state, {visible: false, current: state.current});
    
    case "FOLLOW_NEXT_STEP":
      console.log("FOLLOW_NEXT_STEP");
      updateCurrent = state.current + 1;
      return Object.assign({}, state, {visible: true, current: updateCurrent});
    
    case "FOLLOW_PREV_STEP":
      console.log("FOLLOW_PREV_STEP");
      updateCurrent = state.current - 1;
      return Object.assign({}, state, {visible: true, current: updateCurrent});
    
    default:
      return state;
  }
}

