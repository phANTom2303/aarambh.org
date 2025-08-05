import { Link } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import ArticleDashboard from '../article dashboard/articleDashboard';
import MemberDashboard from '../memberDashboard/memberDashbaord';
import styles from './adminPanel.module.css';

export default function AdminPanel() {
    return (
        <>
            <AdminHeader />
            <main className={styles.dashboardContainer}>
                <div className={styles.welcomeSection}>
                    <h2 className={styles.welcomeTitle}>Welcome to the Admin Dashboard</h2>
                    <p className={styles.welcomeDescription}>Select a section from the navigation above to manage your content.</p>
                </div>
                
                <div className={styles.cardsContainer}>
                    <div className={styles.dashboardCard}>
                        <h3 className={styles.cardTitle}>Article Management</h3>
                        <p className={styles.cardDescription}>Create, edit, and manage articles and events</p>
                        <Link 
                            to="/admin/articles"
                            className={`${styles.cardButton} ${styles.articleButton}`}
                        >
                            Manage Articles
                        </Link>
                    </div>
                    
                    <div className={styles.dashboardCard}>
                        <h3 className={styles.cardTitle}>Member Management</h3>
                        <p className={styles.cardDescription}>Add, edit, and manage team members</p>
                        <Link 
                            to="/admin/members"
                            className={`${styles.cardButton} ${styles.memberButton}`}
                        >
                            Manage Members
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}