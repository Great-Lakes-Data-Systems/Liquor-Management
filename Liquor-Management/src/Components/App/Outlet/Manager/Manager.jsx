import styles from './manager.module.css';
import ManagerBody from './Table/ManagerBody';

function Manager() {
  return (
    <div className={styles.page}>
      <h1 className={`${styles.center} ${styles.managerTitle}`}>Item Manager</h1>
      <ManagerBody />
    </div>
  );
}

export default Manager;