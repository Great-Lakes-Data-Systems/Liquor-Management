import styles from '../select.module.css';
import { useRef, useEffect } from 'react';

export const Option = ({value, id}) => {
  return(
    <li data-index={id}>{value}</li>
  );
};
export const CheckboxOption = ({children, id, onChange}) => {
  return(
    <li className={styles.checkbox_option}>
      <span>
        <input data-index={id} id={id} type="checkbox" onChange={onChange}/>
      </span>
      <label htmlFor={id}>{children}</label>
    </li>
  );
};

const OptionsList = ({ onChange, children, isShowing, setShow, selectRef }) => {

  const optionsListRef = useRef(null);

  // Logic for when clicked outside of OptionsList to hide OptionsList
  const handleClickOutside = (event) => {
    if (optionsListRef.current && !optionsListRef.current.contains(event.target) && !selectRef.current.contains(event.target)) 
      setShow(false);
  };
  
  // Adding the event listener when Tasks pops up
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      // removing the event listener when Tasks is removed
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div className={`${styles.dropdown} ${isShowing ? styles.showing : ''}`} ref={optionsListRef}>
      <ul onClick={onChange}>
        {children}
      </ul>
    </div>
  );
};

export default OptionsList;