import { Link, useLocation } from 'react-router-dom';
import styles from './AdminHeader.module.css';

export default function AdminHeader() {
    const location = useLocation();

    const navItems = [
        { path: '/admin', label: 'Dashboard', exact: true },
        { path: '/admin/articles', label: 'Articles' },
        { path: '/admin/members', label: 'Members' }
    ];

    const isActive = (path, exact = false) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <header className={styles.adminHeader}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/admin" className={styles.logoLink}>
                        <h1>Admin Panel</h1>
                    </Link>
                </div>
                
                <nav className={styles.navigation}>
                    <ul className={styles.navList}>
                        {navItems.map((item) => (
                            <li key={item.path} className={styles.navItem}>
                                <Link 
                                    to={item.path} 
                                    className={`${styles.navLink} ${
                                        isActive(item.path, item.exact) ? styles.active : ''
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
