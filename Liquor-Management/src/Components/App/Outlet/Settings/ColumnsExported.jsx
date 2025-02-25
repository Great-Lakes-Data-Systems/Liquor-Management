import styles from './settings.module.css';
import { useState } from 'react';

const defaultColumns = ['UPC','brand','vendor','type','size', 'CostChange','MsrpChange', 'cost','MSRP','Margin', 'custom'];
const allColumns = ['UPC','brand','vendor','type','size', 'CostChange','MsrpChange', 'cost','MSRP','Margin', 'custom',
  'adaName', 'adaNumber', 'effectiveDate', 'liquorCode', 'packSize', 'proof',];

const ColumnsExported = () => {
  const [allcheckedColumns, setAllCheckedColumns] = useState(JSON.parse(localStorage.getItem('columns_to_export')) || defaultColumns);

  function handleCheckboxChange(e) {
    if (e.target.checked) 
      setAllCheckedColumns([...allcheckedColumns, e.target.name]);
    else 
      setAllCheckedColumns(allcheckedColumns.filter((item) => item !== e.target.name));
  }

  const saveExportColumns = () => {
    localStorage.setItem('columns_to_export', JSON.stringify(allcheckedColumns));
  };

  return (
    <div className={styles.setting_div}>
      <h2>Columns to be exported</h2>
      <p>Select the columns to export.</p>
      <p>Only columns displayed in the table will be exported.</p>
      {allColumns.map((col) => {
        const checked = allcheckedColumns.includes(col);
        const colId = `ColumnsExported${col}`;
        return (<span key={colId}>
          <input type="checkbox" id={colId} name={col} checked={checked && 'checked'} onChange={handleCheckboxChange} />
          <label htmlFor={colId}>{col}</label>
        </span>);
      })}
      <button className={styles.save_button} onClick={saveExportColumns}>Save Changes</button>
    </div>
  );
};

export default ColumnsExported;