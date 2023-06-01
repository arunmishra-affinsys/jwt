import { useState, ChangeEvent, FormEvent } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import todoLogo from "../../assets/todoLogo.svg";
import styles from "./header.module.css";

interface HeaderProps {
  handleAddTask: (title: string) => void;
}

export function Header({ handleAddTask }: HeaderProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    handleAddTask(title);
    setTitle("");
  }

  function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  return (
    <header className={styles?.header}>
      <img src={todoLogo} alt="Todo Logo" />

      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <input
          placeholder="Add a new task"
          type="text"
          onChange={onChangeTitle}
          value={title}
        />
        <button type="submit">
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
      <div className={styles.newTaskFormx}>
        <p
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          {localStorage.getItem("email")}
        </p>
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
          onClick={(e) => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
