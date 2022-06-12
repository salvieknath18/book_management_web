/* eslint-disable import/no-anonymous-default-export */
import { AnyAction } from "redux";
import ActionTypes from "../../ActionTypes";

type UserState = {
  token: string | null;
  username: string | null;
};
const INITIAL_STATE: UserState = {
  token: null,
  username: null,
};

export default (state = INITIAL_STATE, action: AnyAction): UserState => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      console.log(action);
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};
