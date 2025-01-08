import { useState, useEffect } from 'react';
import styles from './filter.module.css';
import ArrowIcon from '../../../../../../../assets/icons/DownArrowIcon';

const Filter = () => {
  const [column, setColumn] = useState('type');
  const [filterType, setFilterType] = useState();
  const [filterValue, setFilterValue] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [displaySizes, setDisplaySizes] = useState(false);

  useEffect(() => {
    column === 'type' && setFilterType('Contains');
    column === 'size' && setFilterType('Equals');
  }, [column]);

  const applyfilter = () => {
    console.log(
      {[column]: {
        filterType: (column === 'cost' || column === 'MSRP') ? 'number' : 'text',
        type: filterType,
        filter: filterValue
      }}
    );
  };

  return (
    <div className={styles.filterComponent}>

      <div>
        <p>In this view show items</p>
      </div>

      <div>
        <label htmlFor='columnFilterId'>Where </label>
        <select name='column' id='columnFilterId' value={column} onChange={e => setColumn(e.target.value)}>
          <option value='type'>Type</option>
          <option value='size'>Size</option>
          <option value='cost'>Cost</option>
          <option value='MSRP'>MSRP</option>
        </select>


        {/* Filter Type */}
        {column === 'type' && <span> Contains </span>}

        {column === 'size' && <span> Equals </span>}

        {(column === 'cost' || column === 'MSRP') && 
        <select name='filterType' onChange={e => setFilterType(e.target.value)}>
          <option value='lessThan'>Less than</option>
          <option value='lessThanOrEqual'>Less than or equal to</option>
          <option value='greaterThan'>Greater than</option>
          <option value='greaterThanOrEqual'>Greater than or equal to</option>
          <option value='inRange'>Between</option>
        </select>}

        {/* Value Inputs */}
        {column === 'type' && 
        <input type='text' placeholder='Enter value...' value={filterValue} onChange={e => setFilterValue(e.target.value)}/>}

        {/* {column === 'size' && 
        <select name='size' multiple onChange={e => setFilterValue(e.target.value)}>
          <option value='50 ML'>50 ML</option>
          <option value='100 ML'>100 ML</option>
          <option value='200 ML'>200 ML</option>
          <option value='375 ML'>375 ML</option>
          <option value='700 ML'>700 ML</option>
          <option value='750 ML'>750 ML</option>
          <option value='1000 ML'>1000 ML</option>
          <option value='1750 ML'>1750 ML</option>
        </select>} */}

        {column === 'size' && 
        <div className={styles.multipleSelection}>
          <button className={styles.sizeSelectBox} onClick={e => {
            e.preventDefault;
            setDisplaySizes(!displaySizes);
          }}>
           Select size
            <ArrowIcon width={16} height={16} />
          </button>
          {displaySizes &&
          <div className={styles.checkBoxes}>
            <label htmlFor='50 ML'>
              <input type='checkbox' id='50 ML' />
              50 ML
            </label>
 
            <label htmlFor='100 ML'>
              <input type='checkbox' id='100 ML' />
              100 ML
            </label>
            <label htmlFor='200 ML'>
              <input type='checkbox' id='200 ML' />
              200 ML
            </label>
            <label htmlFor='375 ML'>
              <input type='checkbox' id='375 ML' />
              375 ML
            </label>
            <label htmlFor='700 ML'>
              <input type='checkbox' id='700 ML' />
              700 ML
            </label>
            <label htmlFor='750 ML'>
              <input type='checkbox' id='750 ML' />
              750 ML
            </label>
            <label htmlFor='1000 ML'>
              <input type='checkbox' id='1000 ML' />
              1000 ML
            </label>
            <label htmlFor='1750 ML'>
              <input type='checkbox' id='1750 ML' />
              1750 ML
            </label>
          </div>}
        </div>}

        {(column === 'cost' || column === 'MSRP') && 
        <input type='number' placeholder='Enter value...' onChange={e => setFilterValue(Number(e.target.value))}/>}

      </div>
      <div>
        <button>Add filter</button>
        <button onClick={applyfilter}>Apply</button>
      </div>
    </div>
  );
};

export default Filter;