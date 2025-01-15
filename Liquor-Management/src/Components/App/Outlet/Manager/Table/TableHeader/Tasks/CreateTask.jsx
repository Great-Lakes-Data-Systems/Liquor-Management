import { useState } from 'react';
import styles from './tasks.module.css';
import { jsxFilter }from './FilterLogHook';
import { customColumnDef } from '../../managerHooks';

const CreateTask = ({ currentGrid, taskName, setTaskName, saveFilterState, setRowData }) => {

  const [increase, setIncrease] = useState({
    dollar: '',
    percentage: ''
  });

  function getNewCost(cost) {
    if (increase.dollar)
      return (Number(cost) + Number(increase.dollar)).toFixed(2);
    else if (increase.percentage) 
      return ( cost * (1 + Number(increase.percentage)) ).toFixed(2);
  }

  const applyCustomPrices = () => {
    const newCustomTableData = [];
    currentGrid.forEachNode( (rowNode) => {
      const customRowNode = JSON.parse(JSON.stringify(rowNode.data));
      if (rowNode.displayed)
        customRowNode.custom = getNewCost(rowNode.data.cost);
      newCustomTableData.push(customRowNode);
    });
    currentGrid.setGridOption('columnDefs', customColumnDef);
    setRowData(newCustomTableData);
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
        <button className={styles.taskTab} onClick={applyCustomPrices}><h3>Apply</h3></button>
        <button className={styles.taskTab} onClick={saveFilterState}><h3>Save</h3></button>
      </div>
    </>
  );
};

export default CreateTask;