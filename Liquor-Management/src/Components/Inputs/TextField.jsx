import TextInput from './Components/TextInput';
import styles from './inputs.module.css';


const TextField = ({...props }) => {
  const {style} = props;
  

  return (
    <div className={styles.container} style={style}>
      <TextInput {...props}/>
    </div>
  );
}

export default TextField;