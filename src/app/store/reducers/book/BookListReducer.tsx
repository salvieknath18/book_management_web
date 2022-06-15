/* eslint-disable import/no-anonymous-default-export */
import { AnyAction } from "redux";
import ActionTypes from "../../ActionTypes";

type BookListState = {
    bookList: [];
};
const INITIAL_STATE: BookListState = {
  bookList: [],
};

const BookList =  (state = INITIAL_STATE, action: AnyAction): BookListState => {
  switch (action.type) {
    case ActionTypes.GET_ALL_BOOKS:
      console.log(action);
      return {
        ...state,
        bookList: action.bookList,
      };
    default:
      return state;
  }
};

export default BookList;