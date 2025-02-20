import { useState } from 'react';
import styles from './tasks.module.css';
import { saveTask, applyCustomPrices } from './TaskHooks';

const CreateTask = ({ currentGrid, setRowData, setDisplayTasks, selected }) => {

  const [taskName, setTaskName] = useState('');
  const [increase, setIncrease] = useState({
    dollar: '',
    percentage: ''
  });

  return (
    <div className={styles.create_task_container}>
      <div className={styles.create_task_body}>
        <input type="text" placeholder='Task Name' value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        <div>
          <h4>Actions to increase {selected} selected items</h4>
          <label htmlFor="increaseByDollar">Increase by dollar </label>
          <input 
            type="number" 
            id='increaseByDollar' 
            placeholder='$' 
            value={increase.dollar} 
            onChange={(e) => setIncrease({dollar: e.target.value, percentage: ''})}/>
          <label htmlFor="increaseByPercentage">Increase by percentage </label>
          <input 
            type="number" 
            id='increaseByPercentage' 
            placeholder='%' 
            value={increase.percentage} 
            onChange={(e) => setIncrease({percentage: e.target.value, dollar: ''})}/>
        </div>
      </div>


      <div className={styles.create_task_buttons_container}>
        <button className={styles.create_task_button} onClick={() => applyCustomPrices(currentGrid, setRowData, increase)}>
        Apply
        </button>

        <button className={styles.create_task_button} 
          onClick={() => saveTask(currentGrid, taskName, setTaskName, setDisplayTasks, increase)}>
        Save
        </button>
      </div>

    </div>
  );
};

export default CreateTask;