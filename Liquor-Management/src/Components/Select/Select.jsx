import {useState} from 'react';
import TextInput from './Components/TextInput';
import OptionsList, {Option} from './Components/OptionsList';

const Select = ({onChange, children}) => {
  const [show, setshow] = useState(true);
  const [value, setValue] = useState(true);
  const changeHandler = (e) => {
    console.log(e);
    setValue(e.target.textContent);
  };
  return (
    <div>
      <TextInput value={value}/>
      <OptionsList onChange={changeHandler}>
        {children}
      </OptionsList>
    </div>
  );
};
Select.Option = Option;
export default Select;