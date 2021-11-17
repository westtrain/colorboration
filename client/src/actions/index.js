export const CLOSE_LOGIN_MODAL = "CLOSE_LOGIN_MODAL";
export const OPEN_LOGIN_MODAL = "OPEN_LOGIN_MODAL";
export const HANDLE_LOGIN = "HANDLE_LOGIN";
export const HANDLE_LOGIN_SUCCESS = "HANDLE_LOGIN_SUCCESS";

// actions creator functions

export const closeLoginModal = () => {
  return {
    type: CLOSE_LOGIN_MODAL,
  };
};

export const openLoginModal = () => {
  return {
    type: OPEN_LOGIN_MODAL,
  };
};

export const handleLogin = (accessToken) => {
  return {
    type: HANDLE_LOGIN,
    payload: {
      accessToken,
    },
  };
};
export const handleLoginSuccess = (userInfo) => {
  return {
    type: HANDLE_LOGIN_SUCCESS,
    payload: {
      userInfo,
    },
  };
};
