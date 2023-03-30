import uuid from 'react-uuid'
import { ArrowCircleDown, Drop, House, PlusCircle, ShareNetwork, Users } from '@phosphor-icons/react'
import styles from './AddTask.module.css';
import React, { FormEvent, useState, KeyboardEvent } from 'react';
import { Card } from './Card';

export interface TaskProps {
  content: string;
  id: string;
  isDone: boolean;
  category: string;
}

const taskContent: TaskProps[] = [
  {
    content: 'Marcar corte de cabelo para próxima semana',
    id: uuid(),
    isDone: false,
    category: 'Pessoal'
  },
  {
    content: 'Colocar as novas prateleiras',
    id: uuid(),
    isDone: false,
    category: 'Casa'
  },
  {
    content: 'Descer com o lixo',
    id: uuid(),
    isDone: true,
    category: 'Casa'
  },
  {
    content: 'Entregar o relatório de progresso da semana',
    id: uuid(),
    isDone: false,
    category: 'Trabalho' 
  },
];

export function AddTask() {
  const [tasks, setTasks] = useState<TaskProps[]>(taskContent)
  const [newtaskText, setNewTaskText] = useState('')
  const [selectedCategory, setSelectedCategory] =useState('Selecione uma categoria') 

  const categories = [
    {id: '1', icon: (<ShareNetwork size={18}/>), name: 'Trabalho'},
    {id: '2', icon: (<House size={18}/>), name: 'Casa'},
    {id: '3', icon: (<Users size={18}/>), name: 'Pessoal'},
  ];

  const [isActive, setIsActive] =useState(false)
 
  function handleNewTaskText(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewTaskText(event.target.value)
  }

  function handleCategoryClick(categoryId: string) {
    const selectedCategory = categories.find((category) => category.id === categoryId)?.name || '';
    setSelectedCategory(selectedCategory);
    setIsActive(false);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    if(selectedCategory === 'Selecione uma categoria') {
      alert('Selecione uma categoria antes de criar uma nova tarefa');
      return;
    }

    const NewTask: TaskProps = {
      content: newtaskText,
      id: uuid(),
      isDone: false,
      category: selectedCategory,
    }

    const NewTaskList = [...tasks, NewTask]

    setTasks(NewTaskList)
    setNewTaskText('')
    setSelectedCategory('Selecione uma categoria')
  }

  function deleteTask(taskId: string) {
    const NewTaskList = tasks.filter((task: TaskProps) => task.id !== taskId)

    setTasks(NewTaskList)
  }

  function selectTask(taskId: string) {
    const NewTaskList = tasks.map((task: TaskProps) => {
      if(task.id === taskId) task.isDone = !task.isDone;
      return task;
    })
    setTasks(NewTaskList)
  }

  function handleNewTaskKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      handleCreateNewTask(event);
    }
  }

  return(
    <div className={styles.addTaskArea}>
      <form onSubmit={handleCreateNewTask} className={styles.newtaskform}>
        <textarea
          name="newtask"
          placeholder="Adicione uma nova tarefa"
          required
          value={newtaskText}
          onChange={(e) => handleNewTaskText(e)}
          onKeyDown={handleNewTaskKeyDown}
        />
        <div className={`${styles.selectCategory} ${isActive ? styles.active : ''}`}>
          <div className={styles.selectButon} onClick={() => setIsActive(!isActive)}>
            <span className={styles.btnText}>{selectedCategory}</span>
            <i><ArrowCircleDown size={20} weight='bold'/></i>
          </div>

          <ul className={styles.options}>
            {categories.map((category) => (
              <li key={category.id} className={styles.option} onClick={() => handleCategoryClick(category.id)}>
                {category.icon}
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        <button type='submit'>Criar <PlusCircle size={20} weight='bold' /></button>
      </form>
      <Card 
        onDelete={deleteTask}
        onSelect={selectTask}
        tasks={tasks}
      />
    </div>
  )
}