import styles from './outlet.module.css';

const Settings = () => {
  return (
    <div className={`${styles.page} ${styles.settings_container}`}>
      <h1 className={styles.center}>Settings</h1>
      <div className={styles.column_separator_div}>
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
      <div className={styles.version_container}>
        <p className={styles.version_p}>Version: 1.0.0</p>
      </div>
    </div>
  );
};

export default Settings;