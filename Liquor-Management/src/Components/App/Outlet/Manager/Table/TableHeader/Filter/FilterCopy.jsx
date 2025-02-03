import { useState, useRef } from 'react';
import FilterRow from './FilterRow/FilterRow';
import styles from './filter.module.css';
import useClickOutside from '../../../../../../../ClickOutside/useClickOutside';
// import Select from '../../../../../../Select/Select';

const Filter = ({ currentGrid, filterTabRef, setDisplayFilter }) => {

  const filterRef = useRef(null);

  useClickOutside(filterRef, (e) => {
    // If user clicked outside the filter on the tab which toggles its visibilty
    // let the tab turn display off. Otherwise set display off here
    if (!filterTabRef.current.contains(e.target))
      setDisplayFilter(false);
  });

  const [ agFilterTemplate, setAgFilterTemplate] = useState([]);
  const [filterCount, setFilterCount] = useState(1);
  // const [filterRows, setFilterRows] = useState([ <FilterRow key={0} index={0} agFilterTemplate={agFilterTemplate} setAgFilterTemplate={setAgFilterTemplate} />]);

  const addFilterColumn = () => {
    setFilterCount(filterCount + 1);
    // const nextIndex = filterRows.length;
    // setFilterRows([ ...filterRows, <FilterRow key={nextIndex} index={nextIndex} agFilterTemplate={agFilterTemplate} setAgFilterTemplate={setAgFilterTemplate} />]);
  };

  // const removeFilterColumn = (index) => {
  //   setFilterRows(filterRows.filter((item) => item.index !== index));
  // };

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
    // TODO: Enable two filters on same column
    const filterModel = agFilterTemplate.reduce(reducer, {});
    console.log('filterModel', filterModel);
    currentGrid.setFilterModel(filterModel);
  };

  return (
    <div className={styles.filterComponent} ref={filterRef}>

      
      <h2 className={styles.filterHeader}>Create Filters</h2>
      {/* <Select placeholder="Filter by" options={['50 ML', '100 ML', '200 ML', '375 ML', '700 ML', '750 ML', '1000 ML', '1750 ML'].map(o => ({id:o,value:o,label:o}))}/> */}
      <div className={styles.filter_table_row}>
        {/* <FilterRow agFilterTemplate={agFilterTemplate} setAgFilterTemplate={setAgFilterTemplate}/> */}
        {filterColumns(filterCount)}
        {/* {[...filterRows]} */}
      </div>
      

      <hr/>



      <div className={styles.filter_button_row}>
        <button onClick={addFilterColumn}>Add filter</button>
        <button onClick={applyfilter}>Apply</button>
        <button onClick={() => currentGrid.setFilterModel(null)}>Clear all filters</button>
      </div>
    </div>
  );
};

export default Filter;