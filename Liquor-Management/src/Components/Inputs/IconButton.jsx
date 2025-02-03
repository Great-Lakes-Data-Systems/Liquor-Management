import styles from './inputs.module.css';

import ButtonBase from './Components/ButtonBase';

const IconButton = ({ children,onClick,...props }) => {
  
  const renderAnchor = () => {
    if (props?.anchorName){
      return {
        anchorName: props.anchorName
      }
    }
    return {}
  }

  return (
    <ButtonBase className={`${styles.button} ${styles.icon} ${styles.primary}`} style={{...renderAnchor(),...props.style}} onClick={onClick}>
      {children}
    </ButtonBase>
  );
}

export default IconButton;