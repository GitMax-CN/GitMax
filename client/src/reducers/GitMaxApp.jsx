const gitMaxApp = (state = [], action) => {
  switch (action.type) {
    case "USER_LOGIN":
      // console.log("start logging in ");
      // // [START createprovider]
      // let provider = new firebase.auth.GithubAuthProvider();
      // // [END createprovider]
      // // [START addscopes]
      // provider.addScope('public_repo');
      // provider.addScope('user:follow');
      // // [END addscopes]
      // // [START signin]
      // firebase.auth().signInWithRedirect(provider);
      // // [END signin]
      console.log("USER_LOGIN update state");
      return state;
    case "USER_LOGOUT":
      // // [START signout]
      // firebase.auth().signOut();
      // [END signout]
      console.log("USER_LOGOUT update state");
      return state;
    case "ADD_FOLLOWERS":
      console.log("ADD_FOLLOWERS update state");
      return state;
    default:
      return state;
  }
};

export default gitMaxApp;