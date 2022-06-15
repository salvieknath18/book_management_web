/* eslint-disable import/no-anonymous-default-export */
import { AnyAction } from "redux";
import ActionTypes from "../../ActionTypes";

type BookData = {
    id: string | null;
    isbn: string | null;
    title: string | null;
    description: string | null;
    genre: string | null;
    author: string | null;
    year_published: string | null;
    total_count: string | null;
    available_count: string | null;
};
const INITIAL_STATE: BookData = {
    id:null,
    isbn:null,
    title:null,
    description:null,
    genre:null,
    author:null,
    year_published:null,
    total_count:null,
    available_count:null,
};

const BookMetaData =  (state = INITIAL_STATE, action: AnyAction): BookData => {
  switch (action.type) {
    case ActionTypes.GET_BOOK:
      console.log(action);
      return {
        ...state,
        id: action.id,
        isbn: action.isbn,
        title: action.title,
        description: action.description,
        genre: action.genre,
        author: action.author,
        year_published: action.year_published,
        total_count: action.total_count,
        available_count: action.available_count,
      };
    default:
      return state;
  }
};

export default BookMetaData;
