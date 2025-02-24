import { useState, useEffect } from 'react';
import styles from '../filter.module.css';
import Select from '../../../../../../../Select/Select';
import TrashIcon from '../../../../../../../../assets/icons/TrashIcon';

const ICON_SIZE = 24;
const allLiquorSizes = ['50 ML', '100 ML', '200 ML', '375 ML', '700 ML', '750 ML', '1000 ML', '1750 ML'];

const FilterRow = ({ index, agFilterTemplate, setAgFilterTemplate, removeFilterRowComponent }) => {

  // Name of column to filter on
  const [column, setColumn] = useState('type');
  // Type of filter e.g. contains, equals etc...
  const [filterType, setFilterType] = useState();
  // Value to filter on
  const [filterValue, setFilterValue] = useState('');
  // If filter type is 'between' this is the second value
  const [filterTo, setFilterTo] = useState('');
  // An array of all liquor sizes selected by user
  const [allcheckedSizes, setAllCheckedSizes] = useState([]);

  function handleCheckboxChange(e) {
    if (e.target.checked) 
      setAllCheckedSizes([...allcheckedSizes, allLiquorSizes[e.target.dataset.index]]);
    else 
      setAllCheckedSizes(allcheckedSizes.filter(item => item !== allLiquorSizes[e.target.dataset.index]));
  }

  useEffect(() => {
    column === 'type' && setFilterType('contains');
    column === 'size' && setFilterType('equals');
  }, [column]);

  useEffect( () => {
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
    setAgFilterTemplate([
      ...agFilterTemplate.filter((item) => item.index !== index), 
      {index: index, filterState: filterState}
    ]);
  }, [allcheckedSizes, column, filterTo, filterType, filterValue,index]);
    
  return (
    <div className={styles.filter_row_item}>
      
      <div className={styles.filter_row_options}>

        <span className={styles.filter_type_selector}>
          <label className={styles.filter_row_label} htmlFor='columnFilterId'>Where:</label>
          <select style={{width:'100%'}} name='column' id='columnFilterId' value={column} onChange={e => setColumn(e.target.value)}>
            <option value='type'>Type</option>
            <option value='size'>Size</option>
            <option value='cost'>Cost</option>
            <option value='MSRP'>MSRP</option>
          </select>
        </span>
        

        <span className={styles.filter_value}>
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

          {column === 'size' && 
          <Select value={allcheckedSizes.join(',')} placeholder="Select Size">
            { allLiquorSizes.map( (size, index) => {
              return(
                <Select.CheckboxOption id={index} key={size} onChange={handleCheckboxChange}>
                  {size}
                </Select.CheckboxOption>
              );
            }) }
          </Select>}

          {(column === 'cost' || column === 'MSRP') && 
            (filterType === 'inRange' ?
              <>
                <input type='number' placeholder='From' value={filterValue} onChange={e => setFilterValue(Number(e.target.value))}/>
                <input type='number' placeholder='To' value={filterTo} onChange={e => setFilterTo(Number(e.target.value))}/>
              </> :
              <input type='number' placeholder='Enter value...' value={filterValue} onChange={e => setFilterValue(Number(e.target.value))}/>
            )}
        </span>

        <span className={styles.filter_delete_button_span} onClick={() => removeFilterRowComponent(index)}>
          <button className={styles.filter_delete_button}>
            <TrashIcon width={ICON_SIZE} height={ICON_SIZE}/>
          </button>
        </span>

      </div>

    </div>
  );
};

export default FilterRow;