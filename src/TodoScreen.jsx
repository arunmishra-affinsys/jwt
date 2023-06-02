import { useEffect, useState, createContext, useContext } from "react";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import DOMPurify from "dompurify";

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
        const newTask = {
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

  function onDeleteSubtask(taskId, subtaskId) {
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

  const onEditTask = (taskId, newTitle) => {
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
  const onEditSubtask = (taskId, subtaskId, newTitle) => {
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
