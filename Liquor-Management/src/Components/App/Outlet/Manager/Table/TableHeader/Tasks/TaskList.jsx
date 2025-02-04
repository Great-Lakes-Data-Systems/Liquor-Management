import { useState } from 'react';
import styles from './tasks.module.css';
import CloseIcon from '../../../../../../../assets/icons/CloseIcon';
import { applyCustomPrices, removeTask } from './TaskHooks';

const TaskList = ({ currentGrid, setDisplayTasks, setRowData }) => {

  const [listOfTasks, setListOfTasks] = useState(JSON.parse(localStorage.getItem('tasksList')));
  const [selectedTask, setSelectedTask] = useState();

  const executeTask = (task) => {
    currentGrid.setFilterModel(task.filterState);
    const upcs = task.upcsOfSelectedItems;
    currentGrid.forEachNode(node => upcs.some((upc) => upc === node.data.UPC) ? node.setSelected(true) : node.setSelected(false));
    applyCustomPrices(currentGrid, setRowData, task.increase);
    currentGrid.applyColumnState({state: task.columnState, applyOrder: true});
    setDisplayTasks(false);
  };

  return (
    <div>
      <ul>
        {listOfTasks.length ?

          listOfTasks.map((task, index) => {
            return (
              <li key={task.taskName || index}>
                <div 
                  className={`${styles.taskButton} ${selectedTask === task && styles.active}`} 
                  onClick={() => setSelectedTask(task)}>
                  <span>{task.taskName  || 'Unnamed Task'}</span>

                  <span 
                    className={styles.task_close_button} 
                    onClick={() => removeTask(task, setListOfTasks)}>
                    <CloseIcon></CloseIcon>
                  </span>
                  
                </div>
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