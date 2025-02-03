import styles from '../inputs.module.css';
import ButtonBase from './ButtonBase';

const CompoundButton = ({ onClick,children,...props }) => {
  return (
    <ButtonBase className={`${styles.button} ${styles.compound} ${props?.default ? styles.active : ""}`} onClick={onClick}>
      {children}
    </ButtonBase>
  );
}

export default CompoundButton;