import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  const [loginToken, setLoginToken] = useState(
    localStorage.getItem("LOGIN_TOKEN")
  );
  const [user, setUser] = useState(localStorage.getItem("LOGIN_USER"));
  useEffect(() => {
    console.log(user);
    console.log(loginToken);
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            loginToken ? (
              <DashboardPage setUser={setUser} setLoginToken={setLoginToken} />
            ) : (
              <AuthPage setUser={setUser} setLoginToken={setLoginToken} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
