/* eslint-disable react/display-name */
import { forwardRef } from 'react';
import styles from './inputs.module.css';

const TextFieldRef = forwardRef(({id,name,value,onChange,placeholder,type,size,style,...props},ref) => {
    return (
      <div data-errormsg="Required Field" className={styles.container} style={style}>
        <input        
          ref={ref}
          type={type}
          id={id}
          name={name}
          className={`${styles.text_field} ${size ? styles[size] : ""}`}
          value={value}
          onChange={onChange}
          onBlur={()=>{}}
          {...props}
          placeholder={placeholder}
          autoComplete="off"          
        />
  
        <label className={`${styles.text_field_label} ${size ? styles[size] : ""}`} htmlFor={`tf`} aria-label={`${"a"} text input`}>
          {placeholder}
        </label>
      </div>
    );
})

export default TextFieldRef;