import { useState, useRef } from 'react';
// import { inventory } from '../data/inventory';
import webData from '../Data/webData';
import Tasks from './Tasks/Tasks';
import Filter from './Filter/FilterCopy';
import styles from './tableHeader.module.css';
import exportData from './exportHook';
import { logFilter } from './Tasks/FilterLogHook';
import BookIcon from '../../../../../../assets/icons/BookIcon';
// import ListULIcon from '../../../../../../assets/icons/ListULIcon';
// import PenIcon from '../../../../../../assets/icons/PenIcon';
import ListCheckedIcon from '../../../../../../assets/icons/ListCheckedIcon';
import FilterIcon from '../../../../../../assets/icons/FilterIcon';
import DownloadIcon from '../../../../../../assets/icons/DownloadIcon';
import Show from '../../../../../Show/Show';

const BUTTON_ICON_SIZE = '30';

const TableHeader = ({ onFilterTextBoxChanged, setRowData, setItemSource, itemSource, currentGrid }) => {

  const [displayTasks, setDisplayTasks] = useState(false);
  const [displayFilter, setDisplayFilter] = useState({displayed: false, style: {display: 'none'}});
  const filterTabRef = useRef(null);
  const taskTabRef = useRef(null);

  // Loads the table with new data and sets the source of the data
  const setTableData = (rowData, itemSource) => {
    setRowData(rowData);
    setItemSource(itemSource);
  };

  const onExportClick = () => {
    const csvExportParams = {
      columnSeparator: localStorage.getItem('colSeparator'),
      columnKeys: ['UPC','brand','vendor','type','size','cost','MSRP','custom']  // Only export these columns (not checkbox column)
    };
    exportData(currentGrid.getDataAsCsv(csvExportParams));
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
            className={`${styles.button} ${itemSource === 'PriceBook' && styles.active}`}
            onClick={() => setTableData(webData, 'PriceBook')}>     
            <BookIcon width={BUTTON_ICON_SIZE} height={BUTTON_ICON_SIZE} />
            <span className={styles.button_text_span}>PriceBook</span>            
          </div>

          {/* TODO: Decide if we want different tabs in the table */}
          
          {/* <div
            className={`${styles.button} ${itemSource === 'Inventory' && styles.active}`}
            onClick={() => setTableData(inventory, 'Inventory')}>
            <ListULIcon width={BUTTON_ICON_SIZE} height={BUTTON_ICON_SIZE} />
            <span className={styles.button_text_span}>Inventory</span>    
          </div> */}

          {/* <div
            className={`${styles.button} ${itemSource === 'Customized' && styles.active}`}
            onClick={() => setTableData(customTable, 'Customized')}>
            <PenIcon width={BUTTON_ICON_SIZE} height={BUTTON_ICON_SIZE} />
            <span className={styles.button_text_span}>Customized</span>    
          </div> */}
        </div>

        <div className={styles.buttonGroupHorizontal}>

          <div className={styles.button} onClick={onExportClick}>
            <DownloadIcon width={BUTTON_ICON_SIZE} height={BUTTON_ICON_SIZE} />
            <span className={styles.button_text_span}>Export</span>
          </div>

          <div 
            className={styles.button} 
            onClick={() => {
              logFilter(currentGrid.getFilterModel());
              if (!displayFilter.displayed)
                setDisplayFilter({displayed: true, style: {display: 'flex'}});
              if (displayFilter.displayed)
                setDisplayFilter({displayed: false, style: {display: 'none'}});
            } }
            ref={filterTabRef}
          >
            <FilterIcon width={BUTTON_ICON_SIZE} height={BUTTON_ICON_SIZE} />
            <span className={styles.button_text_span}>Filter</span>    
          </div>

          
          <Filter 
            currentGrid={currentGrid} 
            filterTabRef={filterTabRef} 
            displayFilter={displayFilter} 
            setDisplayFilter={setDisplayFilter}/>
                             

          <div 
            className={`${styles.button} ${displayTasks && styles.active}`}
            onClick={() => setDisplayTasks(!displayTasks)} ref={taskTabRef}>
            <ListCheckedIcon width={BUTTON_ICON_SIZE} height={BUTTON_ICON_SIZE} />
            <span className={styles.button_text_span}>Tasks</span>    
          </div>

          <Show when={displayTasks}>
            <Tasks
              setDisplayTasks={setDisplayTasks}
              currentGrid={currentGrid}
              taskTabRef={taskTabRef}
              setRowData={setRowData} />
          </Show>

        </div>
      </div>
    </div>
  );
};

export default TableHeader;