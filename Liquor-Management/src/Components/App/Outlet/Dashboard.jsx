import styles from './outlet.module.css';

function Dashboard() {
  return (
    <div className={styles.page}>
      <h1 className={styles.center}>Dashboard</h1>
      <div>Number of items: 11632</div>
    </div>
  );
}

export default Dashboard;