import styles from './footer.module.css';

function Footer () {
 
  return(
    <div className={styles.footer}>
      <span>Details </span>
      <span>Store: GLDS Test Store</span>
      <span>{new Date().toLocaleString()}</span>
    </div>
  );
}

export default Footer;