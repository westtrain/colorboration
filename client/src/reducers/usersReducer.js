import { initialState } from "./initialState";
import {
  HANDLE_LOGIN,
  HANDLE_LOGIN_SUCCESS,
  GET_ALL_PALETTES,
  SET_SHOW_LOGIN_MODAL,
  GET_RANKING_PALETTES,
} from "../actions/index";

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    //로그인 성공 후 토큰 state 업데이트
    case HANDLE_LOGIN:
      return Object.assign({}, state, {
        accessToken: action.payload.accessToken,
      });
      break;
    case HANDLE_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        userInfo: action.payload.userInfo,
        isLogin: true,
      });
      break;
    case GET_ALL_PALETTES:
      return Object.assign({}, state, {
        palettes: action.payload.palettesData,
      });
      break;
    case GET_RANKING_PALETTES:
      return Object.assign({}, state, {
        rankingPalettes: action.payload.palettesData,
      });
      break;
    case SET_SHOW_LOGIN_MODAL:
      return Object.assign({}, state, {
        showLoginModal: action.payload.isOpen,
      });
      break;
    default:
      return { ...state };
  }
};

export default usersReducer;
