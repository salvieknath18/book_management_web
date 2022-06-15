/* eslint-disable import/no-anonymous-default-export */
import { AnyAction } from "redux";
import ActionTypes from "../../ActionTypes";

type gnreDataState = {
  x: string | null;
  y: string | null;
};

type gnreDataStatelist = {
  gnreDatalist: [];
};

const INITIAL_STATE: gnreDataStatelist = {
  gnreDatalist: [],
};

const booksByGenre = (
  state = INITIAL_STATE,
  action: AnyAction
): gnreDataStatelist => {
  switch (action.type) {
    case ActionTypes.GET_BOOKS_BY_GENRE:
      console.log(action);
      return {
        ...state,
        gnreDatalist: action.bookList,
      };
    default:
      return state;
  }
};

export default booksByGenre;
