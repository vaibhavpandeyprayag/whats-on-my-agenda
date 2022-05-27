import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPanel from "../components/LoginPanel";
import SignupPanel from "../components/SignupPanel";
import styles from "./authpage.module.css";

const AuthPage = ({ setUser, setLoginToken }) => {
  useEffect(() => console.log("AuthPage rendered."), []);

  return (
    <div className={styles.page}>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPanel setUser={setUser} setLoginToken={setLoginToken} />
          }
        ></Route>
        <Route
          path="/login"
          element={
            <LoginPanel setUser={setUser} setLoginToken={setLoginToken} />
          }
        ></Route>
        <Route path="/signup" element={<SignupPanel />}></Route>
      </Routes>
    </div>
  );
};

export default AuthPage;
