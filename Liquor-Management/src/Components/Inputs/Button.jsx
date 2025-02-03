import ButtonBase from './Components/ButtonBase';
import styles from './inputs.module.css';

const Button = ({ onClick,children,...props }) => {
  return (
    <ButtonBase {...props} className={`${styles.button} ${styles.default} ${styles.primary}`} onClick={onClick}>
      {children}
    </ButtonBase>
  );
}

export default Button;