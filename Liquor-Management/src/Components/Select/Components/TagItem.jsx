

// import CloseIcon from '../../WESelect/components/icons/CloseIcon';
import styles from '../select.module.css';

const TagItem = ({ value,text, onClick }) => {
  return (
    <div className={styles.tag_item}>
      {text}
      <span onClick={onClick} className={styles.tag_close}>
        {/* <CloseIcon width={"20"} height={"20"} /> */}
        X
      </span>
    </div>
  );
};

export default TagItem;