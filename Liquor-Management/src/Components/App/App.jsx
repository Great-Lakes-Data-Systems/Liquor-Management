import MainHeader from './Layout/Header/MainHeader';
import Navbar from './Layout/Navbar/Navbar';
import btybglds from '../../assets/images/btybglds.png';  // brought to you by GLDS img
import { Outlet } from 'react-router-dom';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.app}>
      <MainHeader />
      <div className={styles.body}>
        <Navbar />
        <Outlet />
      </div>
      <img src={btybglds} alt="Brought to you by GLDS" className={styles.btybglds_img}/>
    </div>
  );
}

export default App;