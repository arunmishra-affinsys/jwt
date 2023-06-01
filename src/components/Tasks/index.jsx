import { Task } from "../Task";
import styles from "./tasks.module.css";
import { useTodoContext } from "../../TodoScreen";

export function Tasks({
  onDelete,
  onComplete,
  onAddSubtask,
  onToggleSubtaskCompleted,
  onDeleteSubtask,
}) {
  const { tasks } = useTodoContext();
  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;

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
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            onComplete={onComplete}
            onAddSubtask={onAddSubtask}
            onToggleSubtaskCompleted={onToggleSubtaskCompleted}
            onDeleteSubtask={onDeleteSubtask}
          />
        ))}
      </div>
    </section>
  );
}
