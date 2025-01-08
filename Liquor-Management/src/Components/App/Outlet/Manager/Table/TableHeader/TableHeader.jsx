import { useState, useRef } from 'react';
import { inventory } from '../data/inventory';
import webData from '../Data/webData';
import Tasks from './Tasks/Tasks';
import Filter from './Filter/Filter';
import styles from './tableHeader.module.css';
import onExportClick from './exportHook';
import { logFilter } from './Tasks/FilterLogHook';
import BookIcon from '../../../../../../assets/icons/BookIcon';
import ListULIcon from '../../../../../../assets/icons/ListULIcon';
import ListCheckedIcon from '../../../../../../assets/icons/ListCheckedIcon';
import FilterIcon from '../../../../../../assets/icons/FilterIcon';
import DownloadIcon from '../../../../../../assets/icons/DownloadIcon';

const BUTTON_ICON_SIZE = '30';

const TableHeader = ({ onFilterTextBoxChanged, setRowData, setItemSource, itemSource, currentGrid }) => {

  const [displayTasks, setDisplayTasks] = useState(false);
  const [displayFilter, setDisplayFilter] = useState(false);
  const [filterStates, setFilterStates] = useState([]);
  const [taskName, setTaskName] = useState('');
  const taskTabRef = useRef(null);

  // Loads the table with new data and sets the source of the data
  const setTableData = (rowData, itemSource) => {
    setRowData(rowData);
    setItemSource(itemSource);
  };

  //  Function to add the state of the grid to an array
  const saveFilterState = () => {
    // console.log('FilterModel', currentGrid.getFilterModel());
    // logFilter(currentGrid.getFilterModel());
    // console.log('ColumnState', currentGrid.getColumnState());
    const filterState = JSON.stringify(currentGrid.getFilterModel());
    const columnState = JSON.stringify(currentGrid.getColumnState());
    setFilterStates([...filterStates, { taskName, filterState, columnState }]);
    console.log('Current list of tasks', [...filterStates, { taskName, filterState, columnState }]);
    setTaskName('');  // Clear the input text
    setDisplayTasks(false);   // Hide the Tasks popup
  };

  return (
    <div className={styles.tableHeader}>

      <input
        type='text'
        placeholder='Search'
        id='filter-text-box'
        className={styles.managerSearch}
        onInput={onFilterTextBoxChanged} >
      </input>

      <div className={styles.buttonContainer}>
        <div className={styles.buttonGroupHorizontal}>

          <div
            className={`${styles.button} ${itemSource === 'PriceBook' ? styles.active : ''}`}
            onClick={() => setTableData(webData, 'PriceBook')}>
            <BookIcon width={BUTTON_ICON_SIZE} height={BUTTON_ICON_SIZE} />            
            <span className={styles.button_text_span}>PriceBook</span>            
          </div>

          <div
            className={`${styles.button} ${itemSource === 'Inventory' ? styles.active : ''}`}
            onClick={() => setTableData(inventory, 'Inventory')}>
            <ListULIcon width={BUTTON_ICON_SIZE} height={BUTTON_ICON_SIZE} />
            <span className={styles.button_text_span}>Inventory</span>    
          </div>
        </div>

        <div className={styles.buttonGroupHorizontal}>

          <div className={styles.button} onClick={() => onExportClick(currentGrid.getDataAsCsv())}>
            <DownloadIcon width={BUTTON_ICON_SIZE} height={BUTTON_ICON_SIZE} />
            <span className={styles.button_text_span}>Export</span>
          </div>

          <div className={styles.button} onClick={() => {
            logFilter(currentGrid.getFilterModel());
            setDisplayFilter(!displayFilter);}
          }>
            <FilterIcon width={BUTTON_ICON_SIZE} height={BUTTON_ICON_SIZE} />
            <span className={styles.button_text_span}>Filter</span>    
          </div>

          {displayFilter && <Filter/>}

          <div 
            className={`${styles.button} ${displayTasks && styles.active}`}
            onClick={() => setDisplayTasks(!displayTasks)} ref={taskTabRef}>
            <ListCheckedIcon width={BUTTON_ICON_SIZE} height={BUTTON_ICON_SIZE} />
            <span className={styles.button_text_span}>Tasks</span>    
          </div>

          {displayTasks &&
            <Tasks
              filterStates={filterStates}
              saveFilterState={saveFilterState}
              setDisplayTasks={setDisplayTasks}
              taskName={taskName}
              setTaskName={setTaskName}
              currentGrid={currentGrid}
              taskTabRef={taskTabRef} />
          }

        </div>
      </div>
    </div>
  );
};

export default TableHeader;