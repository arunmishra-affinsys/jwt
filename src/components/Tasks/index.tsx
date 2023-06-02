import { Task } from "../Task";
import styles from "./tasks.module.css";
import { useTodoContext } from "../../pages/TodoScreen";

interface TasksProps {
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string) => void;
  onAddSubtask: (taskId: string, subtaskTitle: string) => void;
  onToggleSubtaskCompleted: (taskId: string, subtaskId: string) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
  onEditTask: (taskId: string, newTitle: string) => void;
  onEditSubtask: (taskId: string, subtaskId: string, newTitle: string) => void;
}

export function Tasks({
  onDelete,
  onComplete,
  onAddSubtask,
  onToggleSubtaskCompleted,
  onDeleteSubtask,
  onEditTask,
  onEditSubtask,
}: TasksProps) {
  const { tasks } = useTodoContext();
  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter((task: any) => task.isCompleted).length;

  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>Created tasks</p>
          <span>{tasksQuantity}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed tasks</p>
          <span>
            {completedTasks} of {tasksQuantity}
          </span>
        </div>
      </header>

      <div className={styles.list}>
        {tasks.map((task: any) => (
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            onComplete={onComplete}
            onAddSubtask={onAddSubtask}
            onToggleSubtaskCompleted={onToggleSubtaskCompleted}
            onDeleteSubtask={onDeleteSubtask}
            onEditTask={onEditTask}
            onEditSubtask={onEditSubtask}
          />
        ))}
      </div>
    </section>
  );
}
