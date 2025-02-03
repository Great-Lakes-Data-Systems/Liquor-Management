import ButtonBase from './Components/ButtonBase';
import styles from './inputs.module.css';

const OutlineIconButton = ({ children,onClick,...props }) => {
  
  const renderAnchor = () => {
    if (props?.anchorName){
      return {
        anchorName: props.anchorName
      }
    }
    return {}
  }

  return (
    <ButtonBase className={`${styles.button} ${styles.icon} ${styles.outline} ${styles.primary}`} style={renderAnchor()} onClick={onClick}>
      {children}
    </ButtonBase>
  );
}

export default OutlineIconButton;