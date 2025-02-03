import styles from '../select.module.css';

const Display = ({ value,placeholder }) => {

  const render = () => {
    
    if (Array.isArray(value)){
      
      if (value.length === 0){
        return (
          <>
            <span className={`${styles.placeholder}`}>{placeholder}</span>
            <span className={styles.value}>{value}</span> 
          </>
        )
      }
      return (
        <>
          <span className={`${styles.placeholder} ${styles.not} `}>{placeholder}</span>
          <span className={styles.value}>{value}</span> 
        </>
      )
    }

    if (value === ""){
      return (
        <>
          <span className={`${styles.placeholder}`}>{placeholder}</span>
          <span className={styles.value}>{value}</span> 
        </>
      )
    }
    return (
      <>
        <span className={`${styles.placeholder} ${styles.not} `}>{placeholder}</span>
        <span className={styles.value}>{value}</span> 
      </>
    )    
  }
  
  return (
    <div className={styles.display}>
      {render()}
      {/* {((value === "") || (value.length > 0))  ? (<span className={`${styles.placeholder}`}>{placeholder}</span>) : (<span className={`${styles.placeholder} ${styles.not} `}>{placeholder}</span>)}
      
      <span className={styles.value}>{value}</span>       */}
    </div>
  );
}

export default Display;