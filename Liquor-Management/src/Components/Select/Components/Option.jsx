import styles from '../select.module.css';

const Option = ({ value,isSelected,onClick,children,...props }) => {
  return (
    <div value={value} className={`${styles.option} ${isSelected && styles.selected}`} onClick={(e) => onClick(e,value)}>
      {children}
    </div>
  );
}

export default Option;