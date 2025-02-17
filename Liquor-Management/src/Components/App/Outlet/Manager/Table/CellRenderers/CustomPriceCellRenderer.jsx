import { useState, useRef } from 'react';
import styles from './cellrenderers.module.css';
import useClickOutside from '../../../../../../ClickOutside/useClickOutside';

// Money Formatter
const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const CustomPriceCellRenderer = (params) => {
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

export default CustomPriceCellRenderer;