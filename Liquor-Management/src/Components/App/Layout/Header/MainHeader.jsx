import { useNavigate } from 'react-router-dom';
import styles from './header.module.css';

function MainHeader({ showLogout = true}) {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.setItem('token', null);
    navigate('login');
  };

  return (
    <header className={styles.header}>
      <div>
        <span className={`${styles.title} ${styles.logo}`}>GLDS </span>
        <span className={styles.title}>Liquor Management</span>
      </div>
      {showLogout &&
        <div>
          <button className={styles.logout} onClick={logout}>Logout</button>
        </div>
      }
    </header>
  );
}

export default MainHeader;