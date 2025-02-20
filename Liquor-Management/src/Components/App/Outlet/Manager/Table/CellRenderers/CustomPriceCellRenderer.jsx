import { useState, useRef, useEffect } from 'react';
import styles from './cellrenderers.module.css';

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
  useEffect(() => {
    const listener = (e) => {
      // If the ref is not displayed or if clicked on the ref dont call the handler
      if (!cellRef.current || cellRef.current.contains(e.target))
        return;
      setShow(true);  // else if ref is displayed and clicked outside of it call the handler
    };

    if (!show) { // If the input is displayed, add listener to document
      document.addEventListener('mousedown',listener);
      document.addEventListener('touchstart',listener);
    }
    if (show) { // If the input is not displayed, remove listener from document
      document.removeEventListener('mousedown',listener);
      document.removeEventListener('touchstart',listener);
    }// I'm using this instead of useClickOutside so as not to add thousands of event liseners
  },[show]);

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