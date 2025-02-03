import ButtonBase from './Components/ButtonBase';
import styles from './inputs.module.css';

const buttonType = (type) => {
  switch (type) {
    case "primary":
      return styles.primary;
    case "danger":
      return styles.danger;
    case 'secondary':
      return styles.secondary;      
    default:
      return styles.primary;
  }
}

const OutlineButton = ({ onClick,children,level,...props }) => {

  const renderAnchor = () => {
    if (props?.anchorName){
      return {
        anchorName: props.anchorName
      }
    }
    return {}
  }

  return (
    <ButtonBase className={`${styles.button} ${buttonType(level)} ${styles.outline}`} {...props} style={{...renderAnchor(),...props.style}} onClick={onClick}>
      {children}
    </ButtonBase>
  );
}

export default OutlineButton;