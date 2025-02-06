import { useState } from 'react';
import styles from './tasks.module.css';
// import CloseIcon from '../../../../../../../assets/icons/CloseIcon';
import { applyCustomPrices, removeTask } from './TaskHooks';
import TrashIcon from '../../../../../../../assets/icons/TrashIcon';

const BUTTON_ICON_SIZE = 24;

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
    <>
      {listOfTasks.length ?
        <div className={styles.load_task_container}>
          <div className={styles.task_list}>
            <ul className={styles.task_list_ul}>
              {listOfTasks.map((task, index) => {
                return (
                  <li key={task.taskName || index}>
                    <div 
                      className={`${styles.taskButton} ${selectedTask === task && styles.active}`} 
                      onClick={() => setSelectedTask(task)}>
                      <span>{task.taskName  || 'Unnamed Task'}</span>

                      <button 
                        className={styles.task_close_button} 
                        onClick={() => removeTask(task, setListOfTasks)}>
                        <TrashIcon  width={BUTTON_ICON_SIZE} height={BUTTON_ICON_SIZE} />
                      </button>
                  
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <button className={styles.create_task_button} onClick={() => executeTask(selectedTask)}>Apply</button>
        </div>

        : <p>No saved tasks</p>}
    </>
  );
};

export default TaskList;