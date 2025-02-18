import styles from './settings.module.css';
import { useState } from 'react';

const columns = ['UPC','brand','vendor','type','size', 'CostChange','MsrpChange', 'cost','MSRP','Margin', 'custom'];

const ColumnsExported = () => {
  const [allcheckedColumns, setAllCheckedColumns] = useState(JSON.parse(localStorage.getItem('columns_to_export')) || columns);

  function handleCheckboxChange(e) {
    if (e.target.checked) 
      setAllCheckedColumns([...allcheckedColumns, e.target.id]);
    else 
      setAllCheckedColumns(allcheckedColumns.filter((item) => item !== e.target.id));
  }

  const saveExportColumns = () => {
    localStorage.setItem('columns_to_export', JSON.stringify(allcheckedColumns));
  };

  return (
    <div className={styles.setting_div}>
      <h2>Columns to be exported</h2>
      {columns.map((col) => {
        const checked = allcheckedColumns.includes(col);
        return (<span key={col}>
          <input type="checkbox" id={col} name={col} checked={checked ? 'checked':''} onChange={handleCheckboxChange} />
          <label htmlFor={col}>{col}</label>
        </span>);
      })}
      <button onClick={saveExportColumns}>Save Changes</button>
    </div>
  );
};

export default ColumnsExported;