import { useState } from 'react';
import styles from './cellrenderers.module.css';
import CaretDownFillIcon from '../../../../../../assets/icons/CaretDownFillIcon';
import CaretUpFillIcon from '../../../../../../assets/icons/CaretUpFillIcon';

// Money Formatter
const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
  
const getInitialValue = (val) => (val === undefined) ? true : val;

const MsrpChangeCellRenderer = (params) => {
  const [show, setShow] = useState(getInitialValue(params.colDef.dollar));
  
  document.addEventListener('toggleDollarPercent', (e) => {
    if (e.detail.column === params.column.colId)
      setShow(e.detail.dollar);
  });
      
  return (
    <div onClick={() => {setShow(!show); console.log('params', params);}} className={`${styles.center} ${params.data.MsrpChange.direction ? styles.green : styles.red}`} >
      {
        params.data.MsrpChange.direction ? 
          <CaretUpFillIcon color='green'/> :
          <CaretDownFillIcon color='red'/>
      }
      {
        show ? 
          USDollar.format(params.data.MsrpChange.dollar):
          <span>%{(params.data.MsrpChange.percent * 100).toFixed()}</span> 
      }
    </div>
  );
};

export default MsrpChangeCellRenderer;