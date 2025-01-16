import { useState, useRef } from 'react';
import CreateTask from './CreateTask';
import TaskList from './TaskList';
import styles from './tasks.module.css';
import useClickOutside from '../../../../../../../ClickOutside/useClickOutside';

const Tasks = ({ setDisplayTasks, taskTabRef, currentGrid, setRowData }) => {

  const [displayCreateTask, setDisplayCreateTask] = useState(true);
  const taskRef = useRef(null);

  // Logic for when clicked outside of popup to hide popup
  useClickOutside(taskRef, (event) => {
    if (!taskTabRef.current.contains(event.target)) 
      setDisplayTasks(false);
  });

  return (
    <div className={styles.tasks} ref={taskRef}>
      <h1 className={`${styles.taskheader} ${styles.center}`}>Tasks</h1>
      <div>
        <button className={styles.taskTab} onClick={() => setDisplayCreateTask(true)}><h3>Create Task</h3></button>
        <button className={styles.taskTab} onClick={() => setDisplayCreateTask(false)}><h3>Load Task</h3></button>
      </div>
      {displayCreateTask 
        ? <CreateTask 
          currentGrid={currentGrid}
          setRowData={setRowData}
          setDisplayTasks={setDisplayTasks} />
        : <TaskList  
          currentGrid={currentGrid}
          setDisplayTasks={setDisplayTasks}
          setRowData={setRowData} /> }
    </div>
  );
};

export default Tasks;