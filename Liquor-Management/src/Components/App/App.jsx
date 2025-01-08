import MainHeader from './Layout/Header/MainHeader';
import Navbar from './Layout/Navbar/Navbar';
import Footer from './Layout/Footer/Footer';
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
      <Footer />
    </div>
  );
}

export default App;