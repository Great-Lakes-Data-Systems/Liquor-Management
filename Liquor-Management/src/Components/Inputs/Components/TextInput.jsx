import styles from '../inputs.module.css';

const TextInput = ({ value,onChange,type,placeholder,size,...props }) => {
  return (
    <>
      <input        
        type={type}
        id="tf"
        name="tf"
        className={`${styles.text_field} ${size ? styles[size] : ""}`}
        value={value}
        onChange={onChange}
        onBlur={()=>{}}
        {...props}
        placeholder={placeholder}
        autoComplete="off"
        required={false}
      />

      <label className={`${styles.text_field_label} ${size ? styles[size] : ""}`} htmlFor={`tf`} aria-label={`${"a"} text input`}>
        {placeholder}
      </label>
    </>
  );
}

export default TextInput;