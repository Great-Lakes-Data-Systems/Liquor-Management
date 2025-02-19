import styles from './settings.module.css';
import ColumnsExported from './ColumnsExported';
import ChangeColumns from './ChangeColumns';

const Settings = () => {
  return (
    <div className={`${styles.page}`}>
      <h1 className={styles.center}>Settings</h1>
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
      <ChangeColumns />
      <ColumnsExported />
      <div className={styles.version_container}>
        <p className={styles.version_p}>Version: 1.0.0</p>
      </div>
    </div>
  );
};

export default Settings;