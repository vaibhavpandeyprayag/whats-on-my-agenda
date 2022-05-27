import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./signuploginpage.module.css";

const LoginPanel = ({ setUser, setLoginToken }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ username: "", password: "" });
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let goodToSubmit = true;
    if (input.username === "" || input.password === "") goodToSubmit = false;

    if (goodToSubmit === true) {
      var LOGIN_URL = `http://localhost:5000/login/${input.username}`;
      fetch(LOGIN_URL)
        .then((res) => res.json())
        .then((data) => {
          if (data !== null && data.password === input.password) {
            console.log(data);
            console.log("Matched");
            localStorage.setItem("LOGIN_TOKEN", data._id);
            localStorage.setItem("LOGIN_USER", data.username);
            setLoginToken(data._id);
            setUser(data.username);
          }
        });
    }
  };

  useEffect(() => console.log("LoginPanel rendered."), []);
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h1 className={styles.brandHeading}>What's on my agenda</h1>
        <h1 className={styles.heading}>Log in</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.inputLabel}>Username</label>
        <input
          id="usernameInput"
          name="username"
          className={styles.inputBox}
          placeholder="Username"
          onChange={handleChange}
        ></input>
        <label className={styles.inputLabel}>Password</label>
        <input
          id="passwordInput"
          name="password"
          className={styles.inputBox}
          type={"password"}
          placeholder="Password"
          onChange={handleChange}
        ></input>
        <button className={styles.submitButton}>Log in</button>
      </form>
      <Link to={"/signup"} className={styles.authLink}>
        Don't have an account. Signup now
      </Link>
    </div>
  );
};

export default LoginPanel;
