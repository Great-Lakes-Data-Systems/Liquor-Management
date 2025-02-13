import {useState} from 'react';
import styles from './columnHeader.module.css';
import AgGridAscArrow from '../../../../../../assets/icons/AgGridAscArrow';

const ICON_SIZE = 16;

const CustomColumnHeader = (props) => {
  const [dollar, setDollar] = useState(true);
    
  const onSortClicked = () => {
    props.progressSort();
    console.log(props);
  };

  const onIconClicked = () => {
    const event = new CustomEvent('toggleDollarPercent', { 
      detail: {
        dollar: !dollar, 
        column: props.column.colId
      } 
    });
    document.dispatchEvent(event);
    setDollar(!dollar);
  };

  return (
    <>
      <span onClick={onIconClicked} className={styles.icon}>
        {dollar ? '$' : '%'}
      </span>
      <span onClick={onSortClicked}>
        {props.displayName}
      </span>
      <AgGridAscArrow height={ICON_SIZE} width={ICON_SIZE}/>
    </>
  );
};

export default CustomColumnHeader;