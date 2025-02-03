import styles from '../inputs.module.css';
import CompoundButton from './CompoundButton';

const MultiButton = ({ children,...props }) => {

  const updateActiveStatus = (e) => {    
    let container = e.currentTarget;
    let button = e.target.closest("button");
    let buttons = container.querySelectorAll("button");

    buttons.forEach(btn => {
      btn.classList.remove(styles.active);
    });
    button.classList.add(styles.active);    
    console.log("");
  }

  return (
    <div className={styles.multi_btn_container} {...props} onClick={updateActiveStatus}>
      {children}
    </div>
  );
}

MultiButton.Button = CompoundButton;

export default MultiButton;