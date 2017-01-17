//Actions
const GLOBAL_MESSAGE_SHOW = "GLOBAL_MESSAGE_SHOW";
const GLOBAL_MESSAGE_LOADING_SHOW = "GLOBAL_MESSAGE_LOADING_SHOW";
const GLOBAL_MESSAGE_CLEAR = "GLOBAL_MESSAGE_CLEAR";
const GLOBAL_MESSAGE_LOADING_CLEAR = "GLOBAL_MESSAGE_LOADING_CLEAR";

//ActionCreators
export const showMessage = ({type, content}) => {
  if (type !== "loading")
    return {
      type: GLOBAL_MESSAGE_SHOW,
      msg: {
        type,
        content
      }
    };
  else
    return {
      type: GLOBAL_MESSAGE_LOADING_SHOW,
      msg: {
        type,
        content
      }
    }
};

export const clearMessage = () => {
  return {
    type: GLOBAL_MESSAGE_CLEAR,
  }
};

export const clearMessageLoading = () => {
  return {
    type: GLOBAL_MESSAGE_LOADING_CLEAR
  }
};

//Reducer
const initialState = {
  type: null,
  content: null,
  loadingFinish: true,
};

export default function reducer(state = initialState, action) {
  let updateMessage;
  
  switch (action.type) {
    case "GLOBAL_MESSAGE_SHOW":
      console.log("GLOBAL_MESSAGE_SHOW", action.msg);
      return Object.assign({}, action.msg);
    
    case "GLOBAL_MESSAGE_CLEAR":
      console.log("GLOBAL_MESSAGE_CLEAR");
      return Object.assign({}, state, {
        type: null,
        content: null,
        loadingFinish: state.loadingFinish
      });
    
    case "GLOBAL_MESSAGE_LOADING_SHOW":
      console.log("GLOBAL_MESSAGE_SHOW", action.msg);
      return Object.assign({}, action.msg, {loadingFinish: false});
    
    case "GLOBAL_MESSAGE_LOADING_CLEAR":
      console.log("GLOBAL_MESSAGE_LOADING_CLEAR");
      return Object.assign({}, state, {
        loadingFinish: true
      });
    
    default:
      return state;
  }
}