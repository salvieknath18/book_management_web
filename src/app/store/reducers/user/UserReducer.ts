/* eslint-disable import/no-anonymous-default-export */
import { AnyAction } from "redux";
import ActionTypes from "../../ActionTypes";

type UserState = {
  token: string | null;
  id: string | null;
  email: string | null;
  role: string| null;
  name:string|null;
};
const INITIAL_STATE: UserState = {
  token: null,
  id: null,
  email: null,
  role:null,
  name:null
};

const userData = (state = INITIAL_STATE, action: AnyAction): UserState => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
   
      return {
        ...state,
        token: action.data.token,
        id: action.data.id,
        role: action.data.role,
        email:  action.data.email,
        name: action.data.name
      };
    case ActionTypes.LOG_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
 
export default userData;