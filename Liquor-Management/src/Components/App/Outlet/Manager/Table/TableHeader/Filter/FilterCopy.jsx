import { useState } from 'react';
import FilterRow from './FilterRow/FilterRow';
import styles from './filter.module.css';

const Filter = ({ currentGrid }) => {

  const [ agFilterTemplate, setAgFilterTemplate] = useState({});
  const [filterCount, setFilterCount] = useState(1);

  const applyfilter = () => {
    console.log(agFilterTemplate);
    currentGrid.setFilterModel(agFilterTemplate);
  };
  const addFilterColumn = () => {
    setFilterCount(old => old++);
  };

  const filterColumns = (filterCount) => {
    let filterArry = Array(filterCount);
    return filterArry.map((f,index) => {
      return (
        <FilterRow key={index} setAgFilterTemplate={setAgFilterTemplate} />
      );
    });
  };

  return (
    <div className={styles.filterComponent}>

      <div>
        <p className={styles.filterHeader}>In this view show items</p>
      </div>

      <FilterRow agFilterTemplate={agFilterTemplate} setAgFilterTemplate={setAgFilterTemplate}/>
      {/* {filterColumns(filterCount)} */}

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