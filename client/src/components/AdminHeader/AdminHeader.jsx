import { Link, useLocation } from 'react-router-dom';
import styles from './AdminHeader.module.css';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function AdminHeader({ setAdmin }) {
    const location = useLocation();

    const handleLogout = async () => {
        try {
            // Clear the user context
            setAdmin(null);
            // Optional: Call backend to clear the cookie
            await axios.post(`${BACKEND_URL}/admin/logout`, {}, {
                withCredentials: true
            });

            console.log('Admin signed out successfully');
        } catch (error) {
            console.error('Error during sign out:', error);
            // User is still signed out on frontend even if backend call fails
            // Clear localStorage even if backend call fails
        }
    };

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
                <div className={styles.logoSection}>
                    <div className={styles.logo}>
                        <Link to="/admin" className={styles.logoLink}>
                            <h1>Admin Panel</h1>
                        </Link>
                    </div>
                    <div className={styles.userActions}>
                        <button
                            onClick={handleLogout}
                            className={styles.logoutButton}
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <nav className={styles.navigation}>
                    <ul className={styles.navList}>
                        {navItems.map((item) => (
                            <li key={item.path} className={styles.navItem}>
                                <Link
                                    to={item.path}
                                    className={`${styles.navLink} ${isActive(item.path, item.exact) ? styles.active : ''
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
