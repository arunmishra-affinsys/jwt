import { useEffect, useState, createContext, useContext } from "react";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import DOMPurify from "dompurify";
import { AuthContext } from "./pages/AuthContext";

const LOCAL_STORAGE_KEY = "todo:tasks";

const TodoContext = createContext();

function Todo() {
  const [tasks, setTasks] = useState([]);

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  function addTask(taskTitle) {
    //To sanitize the inputs
    let clean = DOMPurify.sanitize(taskTitle);
    setTasksAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: clean,
        isCompleted: false,
        subtasks: [],
      },
    ]);
  }

  function deleteTaskById(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  function toggleTaskCompletedById(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  function addSubtask(taskId, subtaskTitle) {
    let clean = DOMPurify.sanitize(subtaskTitle);
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: [
            ...task.subtasks,
            {
              id: crypto.randomUUID(),
              title: clean,
              isCompleted: false,
            },
          ],
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  function toggleSubtaskCompleted(taskId, subtaskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const newSubtasks = task.subtasks.map((subtask) => {
          if (subtask.id === subtaskId) {
            return {
              ...subtask,
              isCompleted: !subtask.isCompleted,
            };
          }
          return subtask;
        });
        return {
          ...task,
          subtasks: newSubtasks,
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  function onDeleteSubtask(taskId, subtaskId) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedSubtasks = task.subtasks.filter(
          (subtask) => subtask.id !== subtaskId
        );
        return {
          ...task,
          subtasks: updatedSubtasks,
        };
      }
      return task;
    });

    setTasksAndSave(updatedTasks);
  }

  return (
    <TodoContext.Provider value={{ tasks }}>
      {/* <p style={{ color: "white" }}>{isLoggedIn}</p> */}
      <Header handleAddTask={addTask} />
      <Tasks
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
        onAddSubtask={addSubtask}
        onToggleSubtaskCompleted={toggleSubtaskCompleted}
        onDeleteSubtask={onDeleteSubtask}
      />
    </TodoContext.Provider>
  );
}

function useTodoContext() {
  return useContext(TodoContext);
}

export { Todo, useTodoContext };
