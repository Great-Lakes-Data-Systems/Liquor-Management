import styles from './navbar.module.css';
import Link from './Link/Link';

const links = [
  {
    id:1,
    label: 'Dashboard',
    url: 'dashboard'
  },
  {
    id:2,
    label: 'Manage',
    url: '/'
  },
  {
    id:3,
    label: 'Reports',
    url: 'reports'
  },
  {
    id:4,
    label: 'Settings',
    url: 'settings'
  }
];

function Navbar() {
  return (
    <ul className={styles.navbar}>
      {links.map(link => {
        return (
          <li key={link.id}>
            <Link url={link.url} label={link.label} />
          </li>
        );
      })}
    </ul>
  );
}

export default Navbar;