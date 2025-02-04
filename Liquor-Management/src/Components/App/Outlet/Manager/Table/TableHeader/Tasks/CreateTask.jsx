import { useState } from 'react';
import styles from './tasks.module.css';
import { saveFilterState, applyCustomPrices } from './TaskHooks';

const CreateTask = ({ currentGrid, setRowData, setDisplayTasks }) => {

  const [taskName, setTaskName] = useState('');
  const [increase, setIncrease] = useState({
    dollar: '',
    percentage: ''
  });

  return (
    <>
      <input type="text" placeholder='Task Name' value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      <div>
        <h4>Actions to increase selected items</h4>
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
      <div>

        <button className={styles.taskTab} onClick={() => applyCustomPrices(currentGrid, setRowData, increase)}>
          <h3>Apply</h3>
        </button>

        <button className={styles.taskTab} 
          onClick={() => saveFilterState(currentGrid, taskName, setTaskName, setDisplayTasks, increase)}>
          <h3>Save</h3>
        </button>

      </div>
    </>
  );
};

export default CreateTask;