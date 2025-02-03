// import ChevronIcon from '../../WESelect/components/icons/ChevronIcon';
import styles from '../select.module.css';

const SelectToggle = ({ active }) => {
  return (
    <button data-select="button" className={`${styles.select_btn} ${active ? styles.active : ''}`}>
      {/* <ChevronIcon width='20' height='20' /> */}
      ^
    </button>
  );
};

export default SelectToggle;