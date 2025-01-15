import { useState } from 'react';
import styles from './tasks.module.css';
import { jsxFilter }from './FilterLogHook';

const CreateTask = ({ currentGrid, taskName, setTaskName, saveFilterState, setCustomizedTableData }) => {

  const [increase, setIncrease] = useState({
    dollar: 0,
    percentage: 0
  });

  function getNewCost(cost) {
    if (increase.dollar)
      return (Number(cost) + Number(increase.dollar));
    else if (increase.percentage) 
      return cost * (1 + Number(increase.percentage));
    else 
      return cost;
  }

  const applyCustomPrices = () => {
    const newCustomTableData = [];
    currentGrid.forEachNodeAfterFilterAndSort( (rowNode) => {
      const customRowNode = JSON.parse(JSON.stringify(rowNode.data));
      customRowNode.cost = getNewCost(rowNode.data.cost);
      newCustomTableData.push(customRowNode);
    });
    setCustomizedTableData(newCustomTableData);
  };

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
            onChange={(e) => setIncrease({dollar: e.target.value, percentage: 0})}/>
          <label htmlFor="increaseByPercentage">Increase by percentage </label>
          <input 
            type="number" 
            id='increaseByPercentage' 
            placeholder='%' 
            value={increase.percentage} 
            onChange={(e) => setIncrease({percentage: e.target.value, dollar: 0})}/>
        </div>
        <div>
          {jsxFilter(currentGrid.getFilterModel())}
        </div>
      </div>
      <div>
        <button className={styles.taskTab} onClick={applyCustomPrices}><h3>Apply</h3></button>
        <button className={styles.taskTab} onClick={saveFilterState}><h3>Save</h3></button>
      </div>
    </>
  );
};

export default CreateTask;