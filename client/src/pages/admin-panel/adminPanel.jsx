import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import styles from './adminPanel.module.css';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminPanel() {

    const [admin, setAdmin] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                // This request will automatically include the httpOnly cookie
                const response = await axios.get(`${BACKEND_URL}/admin/verify`, {
                    withCredentials: true
                });

                if (response.data.success) {
                    setAdmin({
                        id: response.data.user._id,
                        name: response.data.user.name,
                    });
                }
            } catch (error) {
                console.log('No valid token found');
            } finally {
                setIsLoading(false);
            }
        };

        verifyToken();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login attempt:', { name, password });
        // Handle login logic here
        await axios.get(`${BACKEND_URL}/admin/login`, {
            params: {
                name: name,
                password: password,
            },
            withCredentials: true,
        })
            .then((response) => {
                // Extract and log the token cookie
                const cookies = document.cookie.split(';');
                const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
                if (tokenCookie) {
                    console.log("Auth token:", tokenCookie.trim().substring(6));
                } else {
                    console.log("No token cookie found");
                }
                console.log("Login successful:", response.data);

                // Set the user in context using the response data
                setAdmin({
                    name: response.data.name,
                    id: response.data.id
                });

                setIsSubmitting(false);
                setName('');
                setPassword('');
            })
            .catch((error) => {
                // Handle login errors
                console.error("Login failed:", error.response?.data || error.message);
                alert("Login failed: " + (error.response?.data?.message || "Please try again"));
                setIsSubmitting(false);
            });
    };

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingCard}>
                    <div className={styles.loadingSpinner}></div>
                    <h3 className={styles.loadingTitle}>Loading...</h3>
                    <p className={styles.loadingDescription}>Verifying your credentials</p>
                </div>
            </div>
        );
    }
    else if (admin) {
        return (
            <>
                <AdminHeader setAdmin={setAdmin} />
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
    } else {
        return (
            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <h2 className={styles.loginTitle}>Admin Login</h2>
                    <p className={styles.loginDescription}>Please sign in to access the admin dashboard</p>

                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="name" className={styles.inputLabel}>Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={styles.inputField}
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.inputLabel}>Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.inputField}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button type="submit" className={styles.submitButton}>
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}