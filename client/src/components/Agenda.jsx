import { edit, remove } from "../fontAwesomeIcons";
import styles from "./agenda.module.css";
const Agenda = ({
  index,
  content,
  textareaRef,
  username,
  renderSignal,
  setNewDisabled,
  setUpdateIndex,
  setRenderSignal,
  setNewOrUpdateAgenda,
}) => {
  const handleEdit = () => {
    setNewDisabled(true);
    textareaRef.current.value = content;
    setNewOrUpdateAgenda(content);
    setUpdateIndex(index);
  };

  const handleRemove = () => {
    fetch("http://localhost:5000/agendas/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        username: username,
        agenda: content,
      }),
    }).then((res) => {
      console.log(res);
      setRenderSignal(!renderSignal);
    });
  };
  return (
    <div className={styles.agendaContainer}>
      <label className={styles.serialNo}>{index + 1 + "."}</label>
      <label className={styles.content}>{content}</label>
      <button className={styles.editAgendaButton} onClick={handleEdit}>
        {edit}
      </button>
      <button className={styles.removeAgendaButton} onClick={handleRemove}>
        {remove}
      </button>
    </div>
  );
};

export default Agenda;
