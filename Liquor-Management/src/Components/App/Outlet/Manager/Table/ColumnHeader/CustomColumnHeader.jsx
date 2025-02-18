import {useState} from 'react';
import styles from './columnHeader.module.css';
import AgGridAscArrow from '../../../../../../assets/icons/AgGridAscArrow';
import AgGridDescArrow from '../../../../../../assets/icons/AgGridDescArrow';

const CustomColumnHeader = (props) => {

  // State to control whether dollar or percent is displayed. If true display $, if false display %
  const [dollar, setDollar] = useState(true);  
  const [sortState, setSortState] = useState(0);
    
  // Function to manually sort column
  const onSortClicked = () => {
    props.progressSort();
    setSortState(sortState + 1);
  };

  const onIconClicked = () => {
    const event = new CustomEvent('toggleDollarPercent', { 
      detail: {
        dollar: !dollar, 
        column: props.column.colId
      } 
    });
    props.column.colDef.dollar = !dollar;  // Setting custom field 'dollar' on the column header,
    // so that cells that have not rendered yet will check this field before rendering
    document.dispatchEvent(event); // Sending event to the cell renderers to switch from dollar to percent
    setDollar(!dollar);
  };

  return (
    <div className={styles.container}>
      <span onClick={onIconClicked} className={styles.icon}>
        {dollar ? '$' : '%'}
      </span>
      <span onClick={onSortClicked} className={styles.container}>
        {props.displayName}
        { sortState % 3 === 1 && <AgGridAscArrow /> }
        { sortState % 3 === 2 && <AgGridDescArrow /> }
      </span>
    </div>
  );
};

export default CustomColumnHeader;