import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { useAppSelector } from "./app/store/hooks";
import { RootState } from "./app/store/store";
import Header from "./components/header";

function App() {
  const { token } = useAppSelector((state: RootState) => state.userData);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
