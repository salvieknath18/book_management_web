import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {PersistGate} from 'redux-persist/integration/react'

import { persistor, store } from "./app/store/store";
import User from "./features/user/user";
import Book from "./features/book/book";
import Analytics from "./features/analytics/analytics";
import Login from "./components/login";
import Home from "./features/home/home";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<App />}>
          <Route path="" element={ <Navigate to="home" replace />}/>    
          <Route
            path="login"
            element={<Login />}
          />
          <Route
            path="home"
            element={<Home />}
          />
         <Route path="user" element={<User />} />
        <Route path="book" element={<Book />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
        </Routes>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
