import styles from './link.module.css';
import { NavLink } from 'react-router-dom';

function Link({ url, label }) {
  return (
    <NavLink
      to={url}
      className={({ isActive }) => `${styles.buttonLink} ${isActive && styles.active}`}
    >
      {label}
    </NavLink>
  );
}

export default Link;