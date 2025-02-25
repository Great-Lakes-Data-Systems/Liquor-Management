import { useState } from 'react';
import styles from './settings.module.css';

const defaultColumns = ['UPC','brand','vendor','type','size', 'CostChange','MsrpChange', 'cost','MSRP','Margin', 'custom'];
const allColumns = ['UPC','brand','vendor','type','size', 'CostChange','MsrpChange', 'cost','MSRP','Margin', 'custom',
  'adaName', 'adaNumber', 'effectiveDate', 'liquorCode', 'packSize', 'proof',];

const ChangeColumns = () => {
  const [allcheckedColumns, setAllCheckedColumns] = useState(JSON.parse(localStorage.getItem('columns_to_display')) || defaultColumns);

  function handleCheckboxChange(e) {
    if (e.target.checked) 
      setAllCheckedColumns([...allcheckedColumns, e.target.name]);
    else 
      setAllCheckedColumns(allcheckedColumns.filter((item) => item !== e.target.name));
  }

  const saveColumns = () => {
    localStorage.setItem('columns_to_display', JSON.stringify(allcheckedColumns));
  };

  return (
    <div className={styles.setting_div}>
      <h2>Change the columns to be displayed in the table</h2>
      {allColumns.map((col) => {
        const checked = allcheckedColumns.includes(col);
        const colId = `ChangeColumns${col}`;
        return (<span key={colId}>
          <input type="checkbox" id={colId} name={col} checked={checked && 'checked'} onChange={handleCheckboxChange} />
          <label htmlFor={colId}>{col}</label>
        </span>);
      })}
      <button className={styles.save_button} onClick={saveColumns}>Save Changes</button>
    </div>
  );
};

export default ChangeColumns;