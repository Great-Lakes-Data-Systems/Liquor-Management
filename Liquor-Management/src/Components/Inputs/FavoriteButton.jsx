import ButtonBase from './Components/ButtonBase';
import styles from './inputs.module.css';

const FavoriteButton = ({ onClick,children,...props }) => {
  
  const renderAnchor = () => {
    if (props?.anchorName){
      return {
        anchorName: props.anchorName
      }
    }
    return {}
  }

  return (
    <ButtonBase className={`${styles.button} ${styles.icon} ${styles.favorite} ${styles.outline}`} style={renderAnchor()} onClick={onClick}>
      {children}
    </ButtonBase>
  );
}

export default FavoriteButton;