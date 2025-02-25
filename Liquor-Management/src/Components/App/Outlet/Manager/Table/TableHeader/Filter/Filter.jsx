import { useState, useRef } from 'react';
import FilterRow from './FilterRow/FilterRow';
import styles from './filter.module.css';
import useClickOutside from '../../../../../../../ClickOutside/useClickOutside';
import CloseIcon from '../../../../../../../assets/icons/CloseIcon';

const CLOSE_BUTTON_SIZE = 50;

const reducer = (accumulator, currentValue) => {
  return ( 
    { ...accumulator, ...currentValue.filterState }
  );
};

const Filter = ({ currentGrid, filterTabRef, displayFilter, setDisplayFilter }) => {

  const filterRef = useRef(null);

  useClickOutside(filterRef, (e) => {
    // If user clicked outside the filter on the tab which toggles its visibilty
    // let the tab turn display off. Otherwise set display off here
    if (!filterTabRef.current.contains(e.target))
      setDisplayFilter({displayed: false, style: {display: 'none'}});
  });

  const [ agFilterTemplate, setAgFilterTemplate] = useState([]);
  const [filterCount, setFilterCount] = useState([0]);

  const addFilterColumn = () => {
    // Adding a new number at end of array with value of 1 more than last value
    setFilterCount([...filterCount, filterCount.at(-1) + 1]);
  };

  const removeFilterRowComponent = (index) => {
    setFilterCount(filterCount.filter((id) => id !== index));
  };

  const applyfilter = () => {
    // TODO: Enable two filters on same column
    const filterModel = agFilterTemplate.reduce(reducer, {});
    // console.log('filterModel', filterModel);
    currentGrid.setFilterModel(filterModel);
  };
  
  return (
    <div className={styles.filterComponent} style={displayFilter.style} ref={filterRef}>
      <span className={styles.close_button} onClick={() => setDisplayFilter({displayed: false, style: {display: 'none'}})}>
        <CloseIcon height={CLOSE_BUTTON_SIZE} width={CLOSE_BUTTON_SIZE} color='red'/>
      </span>
      
      <h2 className={styles.filterHeader}>Create Filters</h2>
      <div className={styles.filter_table_row}>
        {filterCount.map((id) => <FilterRow key={id} index={id} agFilterTemplate={agFilterTemplate} setAgFilterTemplate={setAgFilterTemplate} removeFilterRowComponent={removeFilterRowComponent} />)}
      </div>
      

      <div className={styles.filter_button_row}>
        <button className={styles.lm_button} onClick={addFilterColumn}>Add filter</button>
        <button className={styles.lm_button} onClick={applyfilter}>Apply</button>
        <button className={styles.lm_button} onClick={() => currentGrid.setFilterModel(null)}>Clear all filters</button>
      </div>
    </div>
  );
};

export default Filter;