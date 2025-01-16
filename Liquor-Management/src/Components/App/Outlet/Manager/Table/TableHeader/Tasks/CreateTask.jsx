import { useState } from 'react';
import styles from './tasks.module.css';
import { jsxFilter }from './FilterLogHook';
import FilterHooks from './FilterHooks';

const { saveFilterState, applyCustomPrices } = FilterHooks();

const CreateTask = ({ currentGrid, setRowData, setDisplayTasks }) => {

  const [taskName, setTaskName] = useState('');
  const [increase, setIncrease] = useState({
    dollar: '',
    percentage: ''
  });

  return (
    <>
      <input type="text" placeholder='Task Name' value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      <div className={styles.actionsAndFilterStateContainer}>
        <div>
          <h4>Actions</h4>
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
          {jsxFilter(currentGrid.getFilterModel())}
        </div>
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