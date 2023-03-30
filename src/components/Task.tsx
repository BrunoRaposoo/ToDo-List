import { Check, Trash } from '@phosphor-icons/react'
import styles from './Task.module.css';

export interface TaskItemProps  {
  content: string;
  taskId: string;
  isDone: boolean;
  category: string;
  onDelete: (taskId: string) => void;
  onSelect: (taskId: string) => void;
}

export function Task({content, taskId, isDone, category, onDelete, onSelect}: TaskItemProps) {
  function handleDeleteTask() {
    onDelete(taskId)
  }

  function handleSelectTask() {
    onSelect(taskId)
  }
  
  return(
    <div className={styles.taskBox}>
      <div className={styles.taskContent}>
        <button className={isDone ? styles.taskSelected : styles.taskItem} onClick={handleSelectTask}>
          {isDone ? <Check size={14} weight={'bold'}/> : null }
        </button>
      </div>
      <p className={isDone ? styles.TaskTextSelected : styles.taskItemText}>
        {content}
        <div className={styles.category}>
          <span className={styles.color}></span>
          {category}
        </div>
      </p>
      <button className={styles.deleteTask} onClick={handleDeleteTask}>
        <Trash size={24}/>
      </button>
    </div>
  )
}