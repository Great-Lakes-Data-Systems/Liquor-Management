import { useState } from 'react';
import FilterRow from './FilterRow/FilterRow';
import styles from './filter.module.css';

const Filter = ({ currentGrid }) => {

  const [ agFilterTemplate, setAgFilterTemplate] = useState([]);
  const [filterCount, setFilterCount] = useState(1);

  const addFilterColumn = () => {
    setFilterCount(filterCount + 1);
  };

  const filterColumns = (filterCount) => {
    let filterArray = [...Array(filterCount).keys()];
    return filterArray.map((f,index) => {
      return (
        <FilterRow key={index} index={index} agFilterTemplate={agFilterTemplate} setAgFilterTemplate={setAgFilterTemplate} />
      );
    });
  };

  const reducer = (accumulator, currentValue) => {
    const key = Object.keys(currentValue.filterState)[0];
    return ( 
      { ...accumulator, [key]: currentValue.filterState[key] }
    );
  };

  const applyfilter = () => {
    const filterModel = agFilterTemplate.reduce(reducer, {}) ;
    console.log('filterModel', filterModel);
    currentGrid.setFilterModel(filterModel);
  };

  return (
    <div className={styles.filterComponent}>

      <div>
        <p className={styles.filterHeader}>In this view show items</p>
      </div>

      {/* <FilterRow agFilterTemplate={agFilterTemplate} setAgFilterTemplate={setAgFilterTemplate}/> */}
      {filterColumns(filterCount)}

      <hr/>

      <div>
        <button onClick={addFilterColumn}>Add filter</button>
        <button onClick={applyfilter}>Apply</button>
        <button onClick={() => currentGrid.setFilterModel(null)}>Clear all filters</button>
      </div>
    </div>
  );
};

export default Filter;