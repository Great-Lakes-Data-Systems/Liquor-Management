import { useState, useRef, useEffect } from 'react';
import CreateTask from './CreateTask';
import TaskList from './TaskList';
import styles from './tasks.module.css';
// import useClickOutside from '../../../../../../../ClickOutside/useClickOutside';

const Tasks = ({ setDisplayTasks, taskTabRef, currentGrid, setRowData, selected }) => {

  const [displayCreateTask, setDisplayCreateTask] = useState(true);
  const taskRef = useRef(null);

  // // Logic for when clicked outside of popup to hide popup
  // useClickOutside(taskRef, (event) => {
  //   if (!taskTabRef.current.contains(event.target)) 
  //     setDisplayTasks(false);
  // });

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
      <div className={styles.task_page_tab_container}>
        <button className={`${styles.task_page_tab} ${displayCreateTask && styles.active_tab}`} onClick={() => setDisplayCreateTask(true)}>Create Task</button>
        <button className={`${styles.task_page_tab} ${!displayCreateTask && styles.active_tab}`} onClick={() => setDisplayCreateTask(false)}>Load Task</button>
      </div>
      {displayCreateTask 
        ? <CreateTask 
          currentGrid={currentGrid}
          setRowData={setRowData}
          setDisplayTasks={setDisplayTasks}
          selected={selected} />
        : <TaskList  
          currentGrid={currentGrid}
          setDisplayTasks={setDisplayTasks}
          setRowData={setRowData} /> }
    </div>
  );
};

export default Tasks;