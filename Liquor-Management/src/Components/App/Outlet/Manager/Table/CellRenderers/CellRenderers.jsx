import { useState, useRef } from 'react';
import styles from './cellrenderers.module.css';
import useClickOutside from '../../../../../../ClickOutside/useClickOutside';
import CaretDownFillIcon from '../../../../../../assets/icons/CaretDownFillIcon';
import CaretUpFillIcon from '../../../../../../assets/icons/CaretUpFillIcon';

// Money Formatter
const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const MarginCellRenderer = (params) => {
  const [show, setShow] = useState(true);
  document.addEventListener('toggleDollarPercent', (e) => {
    if (e.detail.column === params.column.colId)
      setShow(e.detail.dollar);
  });

  return (
    <div onClick={() => setShow(!show)} className={`${styles.center} ${styles.green}`} >
      <CaretUpFillIcon color='green'/>
      {
        show ? 
          USDollar.format(params.value.dollar) :
          <span>%{params.value.percent}</span>
      }
    </div>
  );
};

export const ChangeCellRenderer = (params) => {
  const [show, setShow] = useState(true);
  document.addEventListener('toggleDollarPercent', (e) => {
    if (e.detail.column === params.column.colId)
      setShow(e.detail.dollar);
  });
    
  return (
    <div onClick={() => {setShow(!show); console.log('params', params);}} className={`${styles.center} ${params.value.direction ? styles.green : styles.red}`} >
      {
        params.value.direction ? 
          <CaretUpFillIcon color='green'/> :
          <CaretDownFillIcon color='red'/>
      }
      {
        show ? 
          USDollar.format(params.value.dollar):
          <span>%{params.value.percent}</span> 
      }
    </div>
  );
};

export const CustomPriceCellRenderer = (params) => {
  // State to control whether value or input is displayed
  const [show, setShow] = useState(true);

  // Function to change the value of the cell to the input value
  const changeValue = (e) => {
    params.node.updateData({...params.node.data, custom:e.target.value, priceChanged: true});
  };

  // If user clicks outside of the component hide the input
  const cellRef = useRef(null);
  useClickOutside(cellRef, () => setShow(true));

  return (
    <div onClick={() => setShow(false)} ref={cellRef} className={params.node.data.priceChanged ? styles.blue : ''} >
      {
        show ?
          USDollar.format(params.value) :
          <input type="number" value={params.value} onChange={changeValue} className={styles.input} onBlur={() => setShow(true)}/>
      }
    </div>
  );
};