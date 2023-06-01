import React from "react";
import styles from "./task.module.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";

export function Task({
  task,
  onDelete,
  onComplete,
  onAddSubtask,
  onToggleSubtaskCompleted,
  onDeleteSubtask,
}) {
  const [subtaskTitle, setSubtaskTitle] = React.useState("");
  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (subtaskTitle.trim() !== "") {
      onAddSubtask(task.id, subtaskTitle);
      setSubtaskTitle("");
    }
  };

  const handleToggleSubtaskCompleted = (subtaskId) => {
    onToggleSubtaskCompleted(task.id, subtaskId);
  };

  const handleDeleteSubtask = (subtaskId) => {
    onDeleteSubtask(task.id, subtaskId);
  };

  return (
    <div className={styles.task}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: "12px",
        }}
      >
        <button
          className={styles.checkContainer}
          onClick={() => onComplete(task.id)}
        >
          {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
        </button>

        <p className={task.isCompleted ? styles.textCompleted : ""}>
          {task.title}
        </p>

        <button
          className={styles.deleteButton}
          onClick={() => onDelete(task.id)}
        >
          <TbTrash size={20} />
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "inherit",
        }}
      >
        <div>
          {task.subtasks.map((subtask) => (
            <div key={subtask.id} className={styles.subtask}>
              <button
                type="checkbox"
                checked={subtask.isCompleted}
                className={styles.checkContainer}
                onClick={() => handleToggleSubtaskCompleted(subtask.id)}
              >
                {subtask.isCompleted ? <BsFillCheckCircleFill /> : <div />}
              </button>

              <p className={subtask.isCompleted ? styles.textCompleted : ""}>
                {subtask.title}
              </p>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteSubtask(subtask.id)}
              >
                <TbTrash size={20} />
              </button>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddSubtask} className={styles.addSubtaskForm}>
          <input
            className={styles.input}
            type="text"
            placeholder="Add a subtask"
            value={subtaskTitle}
            onChange={(e) => setSubtaskTitle(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}
