import { useState, useRef } from 'react';
import FilterRow from './FilterRow/FilterRow';
import styles from './filter.module.css';
import useClickOutside from '../../../../../../../ClickOutside/useClickOutside';
// import Select from '../../../../../../Select/Select';

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

  const reducer = (accumulator, currentValue) => {
    const key = Object.keys(currentValue.filterState)[0];
    return ( 
      { ...accumulator, [key]: currentValue.filterState[key] }
    );
  };

  const applyfilter = () => {
    // TODO: Enable two filters on same column
    const filterModel = agFilterTemplate.reduce(reducer, {});
    console.log('filterModel', filterModel);
    currentGrid.setFilterModel(filterModel);
  };

  return (
    <div className={styles.filterComponent} style={displayFilter.style} ref={filterRef}>

      
      <h2 className={styles.filterHeader}>Create Filters</h2>
      {/* <Select placeholder="Filter by" options={['50 ML', '100 ML', '200 ML', '375 ML', '700 ML', '750 ML', '1000 ML', '1750 ML'].map(o => ({id:o,value:o,label:o}))}/> */}
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