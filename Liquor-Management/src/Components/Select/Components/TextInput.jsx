import ChevronDownIcon from '../../../assets/icons/ChevronDownIcon';
import ChevronUpIcon from '../../../assets/icons/ChevronUpIcon';
import styles from '../select.module.css';

const TextInput = ({ value, placeholder, toggle, show, selectRef }) => {
  return (
    <div onClick={toggle} className={styles.input_container} ref={selectRef}>
      <input type="text" value={value ? value : placeholder} className={styles.select_input} readOnly />
      <span className={styles.select_chevron}>
        {show ?
          <ChevronUpIcon /> :
          <ChevronDownIcon /> }
      </span>
    </div>
  );
};

export default TextInput;