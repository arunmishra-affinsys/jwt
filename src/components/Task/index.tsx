import React, { useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";
import styles from "./task.module.css";

interface TaskProps {
  task: {
    id: string;
    title: string;
    isCompleted: boolean;
    subtasks: {
      id: string;
      title: string;
      isCompleted: boolean;
    }[];
  };
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string) => void;
  onAddSubtask: (taskId: string, subtaskTitle: string) => void;
  onToggleSubtaskCompleted: (taskId: string, subtaskId: string) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
}

export function Task({
  task,
  onDelete,
  onComplete,
  onAddSubtask,
  onToggleSubtaskCompleted,
  onDeleteSubtask,
}: TaskProps) {
  const [subtaskTitle, setSubtaskTitle] = useState("");

  const handleAddSubtask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (subtaskTitle.trim() !== "") {
      onAddSubtask(task.id, subtaskTitle);
      setSubtaskTitle("");
    }
  };

  const handleToggleSubtaskCompleted = (subtaskId: string) => {
    onToggleSubtaskCompleted(task.id, subtaskId);
  };

  const handleDeleteSubtask = (subtaskId: string) => {
    onDeleteSubtask(task.id, subtaskId);
  };

  return (
    <div className={styles.task}>
      <div className={styles.taskHeader}>
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
      <div className={styles.subtasks}>
        {task.subtasks.map((subtask) => (
          <div key={subtask.id} className={styles.subtask}>
            <button
              type="button"
              // ={subtask.isCompleted}
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
  );
}
