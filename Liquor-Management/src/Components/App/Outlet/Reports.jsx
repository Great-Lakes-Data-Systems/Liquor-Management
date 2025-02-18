import styles from './outlet.module.css';
import Select from '../../../Components/Select/Select';

function Reports() {
  const handler = (e) => {
    console.log(e);
  };
  return (
    <div className={styles.page}>
      <h1 className={styles.center}>Reports</h1>
      <Select onChange={handler}>
        <Select.Option value='50 ml' id='0'/>
      </Select>
    </div>
  );
}

export default Reports;