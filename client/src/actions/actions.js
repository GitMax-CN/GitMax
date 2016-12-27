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
    let win = window.open(
        "https://8twfabxgl5.execute-api.us-west-2.amazonaws.com/dev/loginStart",
        "windowname1", 'width=800, height=600', false);
    
    // win.close();
    let pollTimer = window.setInterval(function () {
      try {
        console.log(win.document.URL);
        if (win.document.URL.indexOf(REDIRECT) != -1) {
          
          let url = win.document.URL;
          const acToken = gup(url, 'access_token');
          const tokenType = gup(url, 'token_type');
          const expiresIn = gup(url, 'expires_in');
          
          console.log("acToken", acToken);
          
          console.log("closing window");
          win.close();
          window.clearInterval(pollTimer);
          
          
          function gup(url, name) {
            name = name.replace(/[[]/, "\[").replace(/[]]/, "\]");
            let regexS = "[\?&]" + name + "=([^&#]*)";
            let regex = new RegExp(regexS);
            let results = regex.exec(url);
            if (results == null)
              return "";
            else
              return results[1];
          }
          
          // validateToken(acToken);
        }
      } catch (e) {
      }
    }, 100);
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
  setTimeout(() => console.log("firebase.auth().currentUser", firebase.auth().currentUser), 3000);
  return (dispatch) => {
    let localUserData = localStorage.getItem("user");
    let user = firebase.auth().currentUser ? JSON.parse(localUserData) : null;
    dispatch(userRefresh(user));
  }
};









