import * as firebase from 'firebase';
import fetch from 'isomorphic-fetch';
import config from '../../config';

const userRefresh = (user) => {
  return {
    type: "USER_REFRESH",
    user
  }
};

const userLoginStart = () => {
  return {
    type: "USER_LOGIN_START",
  }
};

const userLoginSuccess = (user) => {
  return {
    type: "USER_LOGIN_SUCCESS",
    user,
  }
};

const userLoginFail = (error) => {
  
  let errorCode = error.code;
  let errorMessage = error.message;
  // The email of the user's account used.
  let email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  let credential = error.credential;
  return {
    type: "USER_LOGIN_FAIL",
    errorMessage
  }
};

const userLogoutSuccess = () => {
  return {
    type: "USER_LOGOUT",
  }
};

const followUserStart = () => {
  return {
    type: "FOLLOW_USER_START"
  }
};

export const userAcknowledgeFollow = () => {
  return {
    type: "USER_ACKNOWLEDGE_FOLLOW"
  }
};

const followUserSuccess = () => {
  return {
    type: "FOLLOW_USER_SUCCESS"
  }
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error
  }
};

const getUserInfo = (token) => {
    // console.log("getUserInfo start - token", token);

    let url = "https://api.github.com/user?access_token=" + token;
    let options = {
      method: "get",
      headers: {
        'User-Agent': "GitMax"
      }
    };

    return fetch(url, options)
        .then(checkStatus)
        .then(response => response.json())
        .then(user => {
            return {
              user,
              token
            }
        });
  };

// const getUserInfo = ({token, email, id, followNumber}) => {
//   // console.log("getUserInfo start - token", token);
//
//   let url = "https://api.github.com/user?access_token=" + token;
//   let options = {
//     method: "get",
//     headers: {
//       'User-Agent': "GitMax"
//     }
//   };
//
//   return fetch(url, options)
//       .then(checkStatus)
//       .then(response => response.json())
//       .then(user => {
//           return {
//             user,
//             token
//           }
//       });
// };

const addFollowers = (data) => {
  let user = data.user,
      token = data.token;
  
  // console.log("user", user);
  const url = config.lambda.addUserEndpoint;
  const options = {
    method: "POST",
    body: JSON.stringify({
      displayName: user.name,
      email: user.email,
      photoURL: user.avatar_url,
      id: String(user.id),
      token: token,
      followNumber: 99, // Todo make this an option for users
    }),
  };
  
  // console.log("options", options);
  return fetch(url, options)
      .then(checkStatus)
      .then(response => response.json());
};

export const userLogin = (token) => {
  return (dispatch) => {
    dispatch(userLoginStart());
    const REDIRECT = "http://localhost";
      let win         =   window.open("https://h6gyvd619g.execute-api.us-west-2.amazonaws.com/production/loginStart", "windowname1", 'width=800, height=600', false);
      
      // win.close();
      let pollTimer   =   window.setInterval(function() {
        try {
          console.log(win.document.URL);
          if (win.document.URL.indexOf(REDIRECT) != -1) {
            console.log("closing window");
            win.close();
            window.clearInterval(pollTimer);
            let url =   win.document.URL;
            acToken =   gup(url, 'access_token');
            tokenType = gup(url, 'token_type');
            expiresIn = gup(url, 'expires_in');
            
          
            // validateToken(acToken);
          }
        } catch(e) {
        }
      }, 100);
    }
    function validateToken(token) {
    
  
  
    /*    const popUpWindow = window.open("https://h6gyvd619g.execute-api.us-west-2.amazonaws.com/production/loginStart",
            "github",
            "height=750, width=500, scrollbars=no, centerscreen=yes, top=100, left=500, location=no");
      
        let i = 0;
    
        // let popup = window.open("http://localhost:5000", "github", "height=750, width=500, scrollbars=no, centerscreen=yes, top=100, left=500, location=no");
        // console.log("popup", popup);
        const receiveMessage = function(event) {
          console.log("event", event);
          // IMPORTANT: Check the origin of the data!
          if (~event.origin.indexOf('http://yoursite.com')) {
            // The data has been sent from your site
          
            // The data sent with postMessage is stored in event.data
            console.log(event.data);
          } else {
            // The data hasn't been sent from your site!
            // Be careful! Do not use it.
            return;
          }
        };
        
        window.addEventListener("message", receiveMessage, false);
    
        const timer = setInterval(()=>{
          i++;
          console.log("popUpWindow.location.href", popUpWindow.location.href);
          // console.log("Start post message");
          // popup.postMessage("hello mainPage", "*");
          // popup.postMessage("hello mainPage", "http://localhost:5000/#/");
          // popUpWindow.postMessage("hello mainPage", "*");
          // console.log("popUpWindow", popUpWindow);
          // console.log("popUpWindow.document.domain", popUpWindow.document.domain);
          // console.log("popUpWindow.document.URL", popUpWindow.document.URL);
          if (i>=10) window.clearInterval(timer);
        }, 1000);*/

    
    
    
  
  
    // window.addEventListener('message', , false);
  
  
    // let provider = new firebase.auth.GithubAuthProvider();
    // provider.addScope('public_repo');
    // provider.addScope('user:follow');
    //
    /*getUserInfo(token)
        .then((data) => {
          let user = data.user;
          console.log("user", user);
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(userLoginSuccess(user));
          return data;
        })
        .then(addFollowers)
        .then(data => {
          dispatch(followUserStart());
        })
        .catch(function (error) {
          // console.log("userLogin error", error);
          // Handle Errors here.
          dispatch(userLoginFail(error));
        });*/
    
    // firebase.auth().signInWithPopup(provider)
    //     .then(result => {
    //       // console.log("result", result);
    //       let token = result.credential.accessToken;
    //       let user = {
    //         token,
    //         email: result.user.email,
    //         id: Array.isArray(result.user.providerData) ? result.user.providerData[0].uid :
    //             result.user.providerData.uid,
    //         followNumber: null
    //       };
    //       // console.log("user from login response", user);
    //       return user;
    //     })
    //     .then(getUserInfo)
    //     .then((data) => {
    //       let user = data.user;
    //       // console.log("user", user);
    //       localStorage.setItem("user", JSON.stringify(user));
    //       dispatch(userLoginSuccess(user));
    //       return data;
    //     })
    //     .then(addFollowers)
    //     .then(data => {
    //       dispatch(followUserStart());
    //     })
    //     .catch(function (error) {
    //       // console.log("userLogin error", error);
    //       // Handle Errors here.
    //       dispatch(userLoginFail(error));
    //     });
  }
};

export const userLogout = () => {
  return (dispatch) => {
    firebase.auth().signOut().then(result => {
      localStorage.setItem("user", null);
      // console.log("firebase.auth().currentUser", firebase.auth().currentUser);
      dispatch(userLogoutSuccess());
    });
  };
};

export const refreshUser = () => {
  // console.log("firebase.auth().currentUser", firebase.auth().currentUser);
  setTimeout(()=>console.log("firebase.auth().currentUser", firebase.auth().currentUser), 3000);
  return (dispatch) => {
    let localUserData = localStorage.getItem("user");
    let user = firebase.auth().currentUser ? JSON.parse(localUserData) : null;
    dispatch(userRefresh(user));
  }
};









