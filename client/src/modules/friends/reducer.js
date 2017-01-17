const initialState = {
  isFetching: false,
  page: 1,
  list: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_FRIEND_LIST_PAGE_NUMBER":
      console.log("CHANGE_FRIEND_LIST_PAGE_NUMBER, action.page", action.page);
      return Object.assign({}, state, {page: action.page});
  
    case "FETCH_FRIENDS_SUCCESS":
      console.log("FETCH_FRIENDS_SUCCESS");
      console.log("action.friendList", action.friendList);
      return Object.assign({},
          initialState,
          {
            list: action.friendList
          }
      );
      
    default: return state;
  }
}
