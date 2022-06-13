/* eslint-disable import/no-anonymous-default-export */
import { AnyAction } from "redux";
import ActionTypes from "../../ActionTypes";

type UserData = {
    id: string | null;
    name: string | null;
    email: string | null;
    role: string | null;
    
};
const INITIAL_STATE: UserData = {
    id: null,
    name: null,
    email: null,
    role: null,
};

const UserMetaData =  (state = INITIAL_STATE, action: AnyAction): UserData => {
  switch (action.type) {
    case ActionTypes.GET_USER:
      console.log(action);
      return {
        ...state,
        id: action.id,
        name: action.name,
        email: action.email,
        role: action.role,
      };
    default:
      return state;
  }
};

export default UserMetaData;
