import { useState, useRef, useEffect } from 'react';
import CreateTask from './CreateTask';
import TaskList from './TaskList';
import styles from './tasks.module.css';

const Tasks = ({ saveFilterState, setDisplayTasks, taskName, setTaskName, filterStates, taskTabRef, currentGrid }) => {

  const [displayCreateTask, setDisplayCreateTask] = useState(true);
  const taskRef = useRef(null);

  // Logic for when clicked outside of popup to hide popup
  const handleClickOutside = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target) && !taskTabRef.current.contains(event.target)) {
      setDisplayTasks(false);
    }
  };

  // Adding the event listener when Tasks pops up
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      // removing the event listener when Tasks is removed
      document.removeEventListener('click', handleClickOutside, true);
    };
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
          saveFilterState={saveFilterState}
          taskName={taskName}
          setTaskName={setTaskName}
          currentGrid={currentGrid}/>
        : <TaskList 
          filterStates={filterStates} 
          currentGrid={currentGrid}
          setDisplayTasks={setDisplayTasks} /> }
    </div>
  );
};

export default Tasks;