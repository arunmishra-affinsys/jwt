import React, { useState } from "react";
import styles from "./task.module.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";

const style = {};

export function Task({
  task,
  onDelete,
  onComplete,
  onAddSubtask,
  onToggleSubtaskCompleted,
  onDeleteSubtask,
  onEditTask,
  onEditSubtask,
}) {
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [editedTaskTitle, setEditedTaskTitle] = useState(task.title);
  const [editedSubtaskTitles, setEditedSubtaskTitles] = useState({});
  const [isTaskEditable, setIsTaskEditable] = useState(false);
  const [isSubtaskEditable, setIsSubtaskEditable] = useState({});

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

  const handleTaskTitleChange = (e) => {
    setEditedTaskTitle(e.target.value);
  };

  const handleSubtaskTitleChange = (subtaskId, e) => {
    setEditedSubtaskTitles((prevTitles) => ({
      ...prevTitles,
      [subtaskId]: e.target.value,
    }));
  };

  const handleTaskTitleBlur = () => {
    if (editedTaskTitle.trim() !== "") {
      onEditTask(task.id, editedTaskTitle); // Save the edited task title
    }
    setIsTaskEditable(false);
  };

  const handleSubtaskTitleBlur = (subtaskId) => {
    const editedTitle = editedSubtaskTitles[subtaskId] || "";
    if (editedTitle.trim() !== "") {
      onEditSubtask(task.id, subtaskId, editedTitle); // Save the edited subtask title
    }
    setIsSubtaskEditable((prevEditable) => ({
      ...prevEditable,
      [subtaskId]: false,
    }));
  };

  const handleEditTask = () => {
    setIsTaskEditable(true);
  };

  const handleEditSubtask = (subtaskId) => {
    setIsSubtaskEditable((prevEditable) => ({
      ...prevEditable,
      [subtaskId]: true,
    }));
    setEditedSubtaskTitles((prevTitles) => ({
      ...prevTitles,
      [subtaskId]: task.subtasks.find((subtask) => subtask.id === subtaskId)
        .title,
    }));
  };

  const handleTaskKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTaskTitleBlur();
    }
  };

  const handleSubtaskKeyPress = (subtaskId, e) => {
    if (e.key === "Enter") {
      handleSubtaskTitleBlur(subtaskId);
    }
  };

  const handleSaveTask = () => {
    handleTaskTitleBlur();
  };

  const handleSaveSubtask = (subtaskId) => {
    handleSubtaskTitleBlur(subtaskId);
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

        {isTaskEditable ? (
          <input
            type="text"
            value={editedTaskTitle}
            onChange={handleTaskTitleChange}
            onBlur={handleTaskTitleBlur}
            onKeyPress={handleTaskKeyPress}
            style={{
              width: "100%",
              border: "1px solid #555",
              background: "#262626",
              color: "white",
              height: "40px",
              padding: "10px",
            }}
          />
        ) : (
          <p
            className={task.isCompleted ? styles.textCompleted : ""}
            onClick={handleEditTask}
          >
            {task.title}
          </p>
        )}

        {isTaskEditable ? (
          <button className={styles.saveButton} onClick={handleSaveTask}>
            <AiOutlineCheck size={20} />
          </button>
        ) : (
          <button className={styles.deleteButton} onClick={handleEditTask}>
            <MdOutlineEdit size={20} />
          </button>
        )}

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

            {isSubtaskEditable[subtask.id] ? (
              <input
                type="text"
                value={editedSubtaskTitles[subtask.id]}
                onChange={(e) => handleSubtaskTitleChange(subtask.id, e)}
                onBlur={() => handleSubtaskTitleBlur(subtask.id)}
                onKeyPress={(e) => handleSubtaskKeyPress(subtask.id, e)}
                style={{
                  width: "100%",
                  border: "1px solid #555",
                  background: "#262626",
                  color: "white",
                  height: "35px",
                  padding: "10px",
                }}
              />
            ) : (
              <p
                className={subtask.isCompleted ? styles.textCompleted : ""}
                onClick={() => handleEditSubtask(subtask.id)}
              >
                {subtask.title}
              </p>
            )}

            {isSubtaskEditable[subtask.id] ? (
              <button
                className={styles.saveButton}
                onClick={() => handleSaveSubtask(subtask.id)}
              >
                <AiOutlineCheck size={20} />
              </button>
            ) : (
              <button
                className={styles.editButton}
                onClick={() => handleEditSubtask(subtask.id)}
              >
                <MdOutlineEdit size={20} />
              </button>
            )}

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
  );
}
