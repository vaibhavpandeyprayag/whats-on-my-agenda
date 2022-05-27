import styles from "./dashboardpage.module.css";
import { add, logout } from "../fontAwesomeIcons";
import Agenda from "../components/Agenda";
import { useEffect, useState, useRef } from "react";

const DashboardPage = ({ setUser, setLoginToken }) => {
  const user = localStorage.getItem("LOGIN_USER");
  const textareaRef = useRef(null);
  const [renderSignal, setRenderSignal] = useState(true);
  const [newDisabled, setNewDisabled] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);
  const [agendas, setAgendas] = useState([]);
  const [newOrUpdateAgenda, setNewOrUpdateAgenda] = useState("");
  const handleLogout = () => {
    setUser(null);
    setLoginToken(null);
    localStorage.removeItem("LOGIN_USER");
    localStorage.removeItem("LOGIN_TOKEN");
  };

  const handleCreateNew = () => {
    var goodToCreate = true;

    if (newOrUpdateAgenda === "") goodToCreate = false;

    if (goodToCreate === true) {
      fetch("http://localhost:5000/agendas/add", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          username: user,
          agenda: newOrUpdateAgenda,
        }),
      }).then((res) => {
        console.log(res);
        textareaRef.current.value = "";
        setNewOrUpdateAgenda("");
        setRenderSignal(!renderSignal);
      });
    }
  };

  const handleUpdate = () => {
    var goodToUpdate = true;

    if (newOrUpdateAgenda === "") goodToUpdate = false;
    if (goodToUpdate === true) {
      fetch("http://localhost:5000/agendas/update", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          username: user,
          index: updateIndex,
          agenda: newOrUpdateAgenda,
        }),
      }).then((res) => {
        console.log(res);
        setNewDisabled(false);
        textareaRef.current.value = "";
        setNewOrUpdateAgenda("");
        setRenderSignal(!renderSignal);
      });
    }
  };

  useEffect(() => {
    var AGENDA_URL = `http://localhost:5000/agendas/${user}`;
    fetch(AGENDA_URL)
      .then((res) => res.json())
      .then((data) => {
        setAgendas(data.agendas);
      });
  }, [renderSignal]);

  useEffect(() => console.log("Dashboard rendered."), []);
  return (
    <div className={styles.dashboardPage}>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <h1 className={styles.brandHeader}>What's on my agenda</h1>
          <label className={styles.userGreeting}>
            Hello <i>{user}</i>
          </label>

          <button className={styles.logoutButton} onClick={handleLogout}>
            <span>{logout}</span>
            <span className={styles.buttonText}>Log out</span>
          </button>
        </div>
        <div className={styles.todoList}>
          {agendas &&
            agendas.map((eachAgenda, index) => (
              <Agenda
                key={index}
                index={index}
                content={eachAgenda}
                textareaRef={textareaRef}
                username={user}
                renderSignal={renderSignal}
                setNewDisabled={setNewDisabled}
                setUpdateIndex={setUpdateIndex}
                setRenderSignal={setRenderSignal}
                setNewOrUpdateAgenda={setNewOrUpdateAgenda}
              />
            ))}
        </div>
        <div className={styles.newAgendaContainer}>
          <textarea
            ref={textareaRef}
            className={styles.newAgendaTextarea}
            onChange={(e) => {
              setNewOrUpdateAgenda(e.target.value);
            }}
          />
          <button
            className={
              newDisabled
                ? styles.newOrUpdateButtonDisabled
                : styles.newOrUpdateButton
            }
            onClick={handleCreateNew}
            disabled={newDisabled ? true : false}
          >
            <span>{add}</span>
            <span className={styles.buttonText}>New</span>
          </button>
          <button
            className={
              newDisabled
                ? styles.newOrUpdateButton
                : styles.newOrUpdateButtonDisabled
            }
            onClick={handleUpdate}
            disabled={newDisabled ? false : true}
          >
            <span>{add}</span>
            <span className={styles.buttonText}>Update</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
