import styles from './settings.module.css';

const ColumnSeparator = () => {
  return (
    <div className={styles.setting_div}>
      <h2>Change the column separator in export</h2>
      <select onChange={(e) => localStorage.setItem('colSeparator', e.target.value)}>
        <option value="" disabled selected hidden>Change separator</option>
        <option value=','>comma</option>
        <option value='\t'>tab</option>
        <option value=';'>semicolon</option>
        <option value=':'>colon</option>
        <option value='|'>pipe</option>
        <option value=' '>space</option>
      </select>
    </div>
  );
};

export default ColumnSeparator;