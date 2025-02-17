import { useState } from 'react';
import styles from './cellrenderers.module.css';
import CaretUpFillIcon from '../../../../../../assets/icons/CaretUpFillIcon';

// Money Formatter
const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const getInitialValue = (val) => (val === undefined) ? true : val;

const MarginCellRenderer = (params) => {
  const [show, setShow] = useState(getInitialValue(params.colDef.dollar));

  document.addEventListener('toggleDollarPercent', (e) => {
    if (e.detail.column === params.column.colId){
      setShow(e.detail.dollar);
      params.colDef.dollar = e.detail.dollar;
    }
  });

  return (
    <div onClick={() => setShow(!show)} className={`${styles.center} ${styles.green}`} >
      <CaretUpFillIcon color='green'/>
      {
        show ? 
          USDollar.format(params.data.Margin.dollar) :
          <span>%{params.data.Margin.percent}</span>
      }
    </div>
  );
};

export default MarginCellRenderer;