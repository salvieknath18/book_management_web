/* eslint-disable import/no-anonymous-default-export */
import { AnyAction } from "redux";
import ActionTypes from "../../ActionTypes";

type borrowBookStatelist = {
  borrowBooklist:[];
}

const INITIAL_STATE: borrowBookStatelist = {
  borrowBooklist:[]
};

const borrowedBookList = (state = INITIAL_STATE, action: AnyAction): borrowBookStatelist => {
  switch (action.type) {
    case ActionTypes.GET_BORROWED_BOOKS:
   
      return {
        ...state,
        borrowBooklist: action.borrowedBookList
      };
    default :  {
        return state
    }
  }
};
 
export default borrowedBookList;