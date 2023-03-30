import { ClipboardText } from '@phosphor-icons/react';
import { TaskProps } from './AddTask';
import styles from './Card.module.css';
import { Task } from './Task';

export interface ListContentProps {
  tasks: TaskProps[];
  onDelete: (taskId: string) => void;
  onSelect: (taskId: string) => void;
}

export function Card({tasks, onDelete, onSelect}: ListContentProps) {
  const createdTasksCount = tasks.length
  const doneTasksCount = tasks.filter(
    (task: TaskProps) => task.isDone === true
  ).length;
  
  const progressPorcentage = (doneTasksCount / createdTasksCount) * 100;

  function onDeletetask(taskId: string) {
    onDelete(taskId)
  }

  function onSelectTask(taskId: string) {
    onSelect(taskId)
  }

  return(
    <div className={styles.cardBox}>
      <header className={styles.menu}>
        <p className={styles.created}>Tarefas criadas
          <span>{createdTasksCount}</span>
        </p>
        <p className={styles.done}>Concluídas
          <span>{doneTasksCount} de {createdTasksCount}</span>
        </p>
      </header>
      <div className={styles.progressBar}>
        <progress className={styles.progress} value={progressPorcentage} max='100' />
        <span>{Math.floor(progressPorcentage)}%</span>
      </div>
      {tasks.length === 0 ? (
        <div className={styles.emptyTask}>
          <ClipboardText size={72}/>
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      ): (
        <main className={styles.taskListBox}>
          {tasks.map(({content, id, isDone, category}: TaskProps) => (
            <Task
              onDelete={onDeletetask}
              onSelect={onSelectTask}
              key={`${id}-${content}`}
              content={content}
              taskId={id}
              isDone={isDone}
              category={category}
            />
          ))}
        </main>
      )}
    </div>
  )
}