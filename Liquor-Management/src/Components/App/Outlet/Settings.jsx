import styles from './outlet.module.css';

const Settings = () => {
  return (
    <div className={styles.page}>
      <span>Settings</span>
      <div>
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
    </div>
  );
};

export default Settings;