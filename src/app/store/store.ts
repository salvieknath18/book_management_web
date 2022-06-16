import {
  createStore,
  combineReducers,
  AnyAction,
  compose,
  applyMiddleware,
} from "redux";
import userData from "./reducers/user/UserReducer";
import UserMetaData from "./reducers/user/UserDataReducer";
import UserList from "./reducers/user/UserListReducer";
import thunk, {
  ThunkAction,
  ThunkDispatch,
  ThunkMiddleware,
} from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import BookList from "./reducers/book/BookListReducer";
import BookMetaData from "./reducers/book/BookDataReducer";
import borrowedBookList from "./reducers/borrow/BorrowListReducer";
import booksByGenre from "./reducers/book/BookByGenre";

const persistConfig = {
  key: 'root',
  storage,
}

const enhancer = compose(applyMiddleware(thunk as ThunkMiddleware));
const reducers = combineReducers({
  userData,
  UserMetaData,
  UserList,
  BookMetaData,
  BookList,
  borrowedBookList,
  booksByGenre,
});


const persistedReducer = persistReducer(persistConfig, reducers)



const store = createStore(persistedReducer, enhancer);
const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export { store,persistor };
