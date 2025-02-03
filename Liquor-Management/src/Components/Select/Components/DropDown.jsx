import styles from '../select.module.css';

const DropDown = ({ isActive,children,...props }) => {
  return (
    <div className={`${styles.drop_down} ${isActive ? styles.active : ""}`}>      
      {children}
    </div>
  );
}

export default DropDown;