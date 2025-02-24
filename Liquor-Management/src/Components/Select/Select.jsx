import {useState} from 'react';
import TextInput from './Components/TextInput';
import styles from './select.module.css';
import OptionsList, {Option, CheckboxOption} from './Components/OptionsList';

const Select = ({ value, onChange, placeholder='Select', children}) => {
  const [show, setShow] = useState(false);
  
  const changeHandler = (e) => {
    console.log(e);
  };
  
  return (
    <div className={styles.select_container} title={value}>
      <TextInput placeholder={placeholder} value={value} toggle={() => setShow(!show)} show={show} />
      <OptionsList isShowing={show} onChange={changeHandler}>
        {children}
      </OptionsList>
    </div>
  );
};
Select.Option = Option;
Select.CheckboxOption = CheckboxOption;
export default Select;