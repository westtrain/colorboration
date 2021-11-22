export const HANDLE_LOGIN = "HANDLE_LOGIN";
export const HANDLE_LOGIN_SUCCESS = "HANDLE_LOGIN_SUCCESS";
export const GET_ALL_PALETTES = "GET_ALL_PALETTES";
export const GET_RANKING_PALETTES = "GET_RANKING_PALETTES";
export const SET_SHOW_LOGIN_MODAL = "SET_SHOW_LOGIN_MODAL";
// actions creator functions

export const setShowLoginModal = (isOpen) => {
  return {
    type: SET_SHOW_LOGIN_MODAL,
    payload: {
      isOpen,
    },
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

export const getAllPalettes = (palettesData) => {
  return {
    type: GET_ALL_PALETTES,
    payload: {
      palettesData,
    },
  };
};

export const getRankingPalettes = (palettesData) => {
  return {
    type: GET_RANKING_PALETTES,
    payload: {
      palettesData,
    },
  };
};
