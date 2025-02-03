import styles from './inputs.module.css';

const Label = ({ text,children,stack=false,...props }) => {
  return (
    <div className={`${styles.label} ${stack ? styles.stack : ""}`}>
      <label>{text}</label>
       <span>{children}</span>
    </div>
  );
}

export default Label;