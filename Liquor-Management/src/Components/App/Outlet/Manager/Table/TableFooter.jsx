import styles from './manager.module.css';

const TableFooter = ({ selected, totalRows, itemSource }) => {
  return (
    <div className={styles.tableFooter}>
      <span>Items: {totalRows}</span>
      <span>Item Source: {itemSource}</span>
      <span>Selected: {selected || 0}</span>
    </div>
  );
};

export default TableFooter;