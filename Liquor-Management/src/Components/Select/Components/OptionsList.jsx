import styles from '../select.module.css';

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

const OptionsList = ({onChange, children, isShowing}) => {
  return (
    <div className={`${styles.dropdown} ${isShowing ? styles.showing :''}`}>
      <ul onClick={onChange}>
        {children}
      </ul>
    </div>
  );
};

export default OptionsList;