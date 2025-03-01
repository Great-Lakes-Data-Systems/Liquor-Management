import { useState, useEffect } from 'react';
import styles from './filter.module.css';
import ArrowIcon from '../../../../../../../assets/icons/DownArrowIcon';

const Filter = ({ currentGrid }) => {

  // Name of column to filter on
  const [column, setColumn] = useState('type');
  // Type of filter e.g. contains, equals etc...
  const [filterType, setFilterType] = useState();
  // Value to filter on
  const [filterValue, setFilterValue] = useState('');
  // If filter type is 'between' this is the second value
  const [filterTo, setFilterTo] = useState('');
  // Display the dropdown menu of possible liquor sizes
  const [displaySizes, setDisplaySizes] = useState(false);
  // An array of all liquor sizes selected by user
  const [allcheckedSizes, setAllCheckedSizes] = useState([]);

  const allLiquorSizes = ['50 ML', '100 ML', '200 ML', '375 ML', '700 ML', '750 ML', '1000 ML', '1750 ML'];

  function handleCheckboxChange(e) {
    if (e.target.checked) {
      setAllCheckedSizes([...allcheckedSizes, e.target.id]);
    } else {
      setAllCheckedSizes(allcheckedSizes.filter((item) => item !== e.target.id));
    }
  }

  useEffect(() => {
    column === 'type' && setFilterType('contains');
    column === 'size' && setFilterType('equals');
  }, [column]);

  const applyfilter = () => {
    let filterState = {[column]: {
      filterType: (column === 'cost' || column === 'MSRP') ? 'number' : 'text',
      type: filterType,
      filter: filterValue,
      filterTo: filterTo
    }};
    if (column === 'size') 
      filterState = { size: {
        filterType: 'text',
        operator: 'OR',
        conditions: allcheckedSizes.map( size => {
          return {
            filterType: 'text',
            type:'equals',
            filter: size
          };
        })
      }};
    console.log(filterState);
    currentGrid.setFilterModel(filterState);
  };

  return (
    <div className={styles.filterComponent}>

      <div>
        <p className={styles.filterHeader}>In this view show items</p>
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

            { allLiquorSizes.map( size => {
              return(
                <label htmlFor={size} key={size}>
                  <input type='checkbox' id={size} onChange={handleCheckboxChange}/>
                  {size}
                </label>
              );
            }) }
          </div>}
        </div>}

        {(column === 'cost' || column === 'MSRP') && 
        (filterType === 'inRange' ?
          <>
            <input type='number' placeholder='From' value={filterValue} onChange={e => setFilterValue(Number(e.target.value))}/>
            <input type='number' placeholder='To' value={filterTo} onChange={e => setFilterTo(Number(e.target.value))}/>
          </> :
          <input type='number' placeholder='Enter value...' value={filterValue} onChange={e => setFilterValue(Number(e.target.value))}/>
        )}

      </div>

      <hr/>

      <div>
        <button>Add filter</button>
        <button onClick={applyfilter}>Apply</button>
        <button onClick={() => currentGrid.setFilterModel(null)}>Clear all filters</button>
      </div>
    </div>
  );
};

export default Filter;