import ChevronDownIcon from '../../../assets/icons/ChevronDownIcon';
import styles from '../select.module.css';

const TextInput = ({ value,placeholder, toggle }) => {
  return (
    <div onClick={toggle} className={styles.input_container}>
      <input type="text" value={value ? value : placeholder} className={styles.select_input} />
      <span className={styles.select_chevron}>
        <ChevronDownIcon />
      </span>
    </div>
  );
};

export default TextInput;