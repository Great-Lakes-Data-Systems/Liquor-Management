import EyeIcon from '../../assets/Icons/EyeIcon';
import useToggle from '../../hooks/useToggle';
import TextInput from './Components/TextInput';
import styles from './inputs.module.css';


const ShowPasswordButton = ({onClick}) => {
  return (
    <button  className={`${styles.acc_cmp} ${styles.show_pw_button}`} onClick={onClick}><EyeIcon width={20} height={20} /></button>
  )
}

const PasswordTextField = ({ ...props }) => {
  const {isToggled,toggle} = useToggle(true);

  const toggleInputType = (e) => {
    e.preventDefault();
    try {
      toggle();
    } catch (error) {
      console.error(`${error.message}`);
    }
  }

  return (    
    <div className={styles.container} style={props.style}>
      <ShowPasswordButton onClick={toggleInputType}/>
      <TextInput type={isToggled ? "text" : "password"} {...props}/>
    </div>
  );
}

export default PasswordTextField;

//{/* {type === "password" ? (<button  className={`${styles.acc_cmp} ${styles.clear_btn}`}><EyeIcon /></button>) : null} */}