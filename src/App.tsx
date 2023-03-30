import { Header } from './components/Header';
import styles from './App.module.css';
import './global.css';
import { AddTask } from './components/AddTask';

export function App() {
  return(
    <div className={styles.wrapper}>
      <Header />

      <div className={styles.content}>
        <AddTask />
      </div>
    </div>
  )
}
