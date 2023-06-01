import { useEffect, useState, createContext, useContext } from "react";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import DOMPurify from "dompurify";
import { AuthContext } from "./pages/AuthContext";

const LOCAL_STORAGE_KEY = "todo:tasks";

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  subtasks: Subtask[];
}

interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface TodoContextValue {
  tasks: Task[];
}

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

function Todo() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { isLoggedIn } = useContext(AuthContext);

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  function setTasksAndSave(newTasks: Task[]) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  function addTask(taskTitle: string) {
    // To sanitize the inputs
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

  function deleteTaskById(taskId: string) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  function toggleTaskCompletedById(taskId: string) {
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

  function addSubtask(taskId: string, subtaskTitle: string) {
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

  function toggleSubtaskCompleted(taskId: string, subtaskId: string) {
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

  function onDeleteSubtask(taskId: string, subtaskId: string) {
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
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
}

export { Todo, useTodoContext };
