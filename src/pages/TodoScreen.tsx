import { useEffect, useState, createContext, useContext } from "react";
import { Header } from "../components/Header";
import { Tasks } from "../components/Tasks";
import DOMPurify from "dompurify";

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

interface TodoContextProps {
  tasks: Task[];
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

function Todo() {
  const [tasks, setTasks] = useState<Task[]>([]);

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
        const newTask: Task = {
          ...task,
          isCompleted: !task.isCompleted,
        };

        // Update completion status of subtasks
        const newSubtasks = newTask.subtasks.map((subtask) => ({
          ...subtask,
          isCompleted: newTask.isCompleted,
        }));

        return {
          ...newTask,
          subtasks: newSubtasks,
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

        // Check if all subtasks are completed
        const allSubtasksCompleted = newSubtasks.every(
          (subtask) => subtask.isCompleted
        );

        return {
          ...task,
          subtasks: newSubtasks,
          isCompleted: allSubtasksCompleted, // Update parent task's completion status
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
        let allSubtasksCompleted = false;
        if (updatedSubtasks.length) {
          allSubtasksCompleted = updatedSubtasks.every(
            (subtask) => subtask.isCompleted
          );
        }

        return {
          ...task,
          subtasks: updatedSubtasks,
          isCompleted: allSubtasksCompleted, // Update parent task's completion status
        };
      }
      return task;
    });

    setTasksAndSave(updatedTasks);
  }

  const onEditTask = (taskId: string, newTitle: string) => {
    // Assuming you have a state variable called "tasks" that holds the list of tasks
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, title: newTitle };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  // Function to handle editing a subtask title
  const onEditSubtask = (
    taskId: string,
    subtaskId: string,
    newTitle: string
  ) => {
    // Assuming you have a state variable called "tasks" that holds the list of tasks
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedSubtasks = task.subtasks.map((subtask) => {
          if (subtask.id === subtaskId) {
            return { ...subtask, title: newTitle };
          }
          return subtask;
        });

        return { ...task, subtasks: updatedSubtasks };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <TodoContext.Provider value={{ tasks }}>
      <Header handleAddTask={addTask} />
      <Tasks
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
        onAddSubtask={addSubtask}
        onToggleSubtaskCompleted={toggleSubtaskCompleted}
        onDeleteSubtask={onDeleteSubtask}
        onEditTask={onEditTask}
        onEditSubtask={onEditSubtask}
      />
    </TodoContext.Provider>
  );
}

function useTodoContext() {
  return useContext(TodoContext);
}

export { Todo, useTodoContext };
