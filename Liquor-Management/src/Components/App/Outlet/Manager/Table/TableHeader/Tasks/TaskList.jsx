import { useState, useRef } from 'react';
import styles from './tasks.module.css';
import FilterHooks from './FilterHooks';

const { applyCustomPrices } = FilterHooks();

const TaskList = ({ currentGrid, setDisplayTasks, setRowData }) => {

  const filterStatesRef = useRef(JSON.parse(localStorage.getItem('tasksList')));
  const [selectedTask, setSelectedTask] = useState();

  const executeTask = (task) => {
    currentGrid.setFilterModel(task.filterState);
    applyCustomPrices(currentGrid, setRowData, task.increase);
    currentGrid.applyColumnState({state: task.columnState, applyOrder: true});
    setDisplayTasks(false);
  };

  return (
    <div>
      <ul>
        {filterStatesRef.current ?

          filterStatesRef.current.map((task, index) => {
            return (
              <li key={task.taskName || index}>
                <button 
                  className={`${styles.taskButton} ${selectedTask === task && styles.active}`} 
                  onClick={() => setSelectedTask(task)}>
                  {task.taskName  || 'Unnamed Task'}
                </button>
              </li>
            );
          })

          : <p>No saved tasks</p>}

      </ul>
      <button className={styles.taskTab} onClick={() => executeTask(selectedTask)}><h3>Apply</h3></button>
    </div>
  );
};

export default TaskList;