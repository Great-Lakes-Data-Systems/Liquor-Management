import styles from './settings.module.css';
import ColumnSeparator from './ColumnSeparator';
import ChangeColumns from './ChangeColumns';
import ColumnsExported from './ColumnsExported';

const Settings = () => {
  return (
    <div className={`${styles.page}`}>
      <h1 className={styles.center}>Settings</h1>
      <ColumnSeparator />
      <ChangeColumns />
      <ColumnsExported />
      <div className={styles.version_container}>
        <p className={styles.version_p}>Version: 1.0.0</p>
      </div>
    </div>
  );
};

export default Settings;