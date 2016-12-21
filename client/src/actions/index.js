export const userLogin = (user) => {
  'use strict';
  return {
    type: "USER_LOGIN",
    user: user,
  }
};

export const userLogout = () => {
  'use strict';
  return {
    type: "USER_LOGOUT",
  }
};

export const addFollowers = (followers) => {
  'use strict';
  return {
    type: "ADD_FOLLOWERS",
    followers: followers,
  }
};








