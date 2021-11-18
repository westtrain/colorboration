import { initialState } from "./initialState";
import { HANDLE_LOGIN, HANDLE_LOGIN_SUCCESS } from "../actions/index";

const usersReducer = (state = initialState, action) => {
  console.log("== usersReducer ==");
  switch (action.type) {
    //로그인 성공 후 토큰 state 업데이트
    case HANDLE_LOGIN:
      return Object.assign({}, state, {
        accessToken: action.payload.accessToken,
      });
      break;
    case HANDLE_LOGIN_SUCCESS:
      console.log(action.payload, "=====");
      return Object.assign({}, state, {
        userInfo: action.payload.userInfo,
        isLogin: true,
      });
      break;
    default:
      return { ...state };
  }
};

export default usersReducer;
