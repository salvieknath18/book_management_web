/* eslint-disable import/no-anonymous-default-export */
import { AnyAction } from "redux";
import ActionTypes from "../../ActionTypes";

type UserListState = {
    userList: [];
};
const INITIAL_STATE: UserListState = {
  userList: [],
};

const UserList =  (state = INITIAL_STATE, action: AnyAction): UserListState => {
  switch (action.type) {
    case ActionTypes.GET_ALL_USERS:
      console.log(action);
      return {
        ...state,
        userList: action.userList,
      };
    default:
      return state;
  }
};

export default UserList;