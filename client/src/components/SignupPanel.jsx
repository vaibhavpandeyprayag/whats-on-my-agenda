import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./signuploginpage.module.css";

const SignupPanel = () => {
  const navigate = useNavigate();
  const [usernames, setUsernames] = useState([]);
  const [input, setInput] = useState({ username: "", password: "" });
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let goodToSubmit = true;
    if (input.username === "" || input.password === "") goodToSubmit = false;
    else {
      usernames.map((usernameObj) => {
        if (usernameObj.username === input.username) goodToSubmit = false;
      });
    }

    if (goodToSubmit === true) {
      fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(input),
      }).then((res) => {
        if (res.ok) {
          console.log(res);
          fetch("http://localhost:5000/usernames/add", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ username: input.username }),
          }).then((res) => {
            if (res.ok) {
              console.log(res);
            } else console.log(res.statusText);
          });
          fetch("http://localhost:5000/agendas/createuseragenda", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
              username: input.username,
              agendas: [],
            }),
          }).then((res) => {
            if (res.ok) {
              console.log(res);
              navigate("/login");
            } else console.log(res.statusText);
          });
        } else console.log(res.statusText);
      });
    }
  };
  useEffect(() => console.log(input.username), [input]);
  useEffect(() => {
    console.log("Dashboard/TodoList rendered.");
    fetch("http://localhost:5000/usernames/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsernames(data);
      });
  }, []);
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h1 className={styles.brandHeading}>What's on my agenda</h1>
        <h1 className={styles.heading}>Sign up</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* <label className={styles.inputLabel}>Email</label>
        <input
          id="emailInput"
          className={styles.inputBox}
          placeholder="Email"
        ></input> */}
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
        <button className={styles.submitButton}>Create Account</button>
      </form>
      <Link to={"/"} className={styles.authLink}>
        Already have an account. Login here.
      </Link>
    </div>
  );
};

export default SignupPanel;
