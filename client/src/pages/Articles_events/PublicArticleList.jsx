import { useEffect, useState } from "react";
import styles from "./ArticleList.module.css";
import Header from "../homepage/Header";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function PublicArticleList() {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await fetch(`${BACKEND_URL}/articles/list`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setArticles(data.articles);
            } catch (e) {
                console.error("Failed to fetch articles:", e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        fetchArticles();
    }, []);

    if (loading) return <p>Loading articles...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!articles || articles.length === 0) return <p>No articles found.</p>;

    return (
        <>
        <Header/>
        <div className={styles.articleGrid}>
            {articles.map((a) => (
                <a key={a._id} href={`/activities/${a._id}`} className={styles.cardLink}>
                    <div className={styles.articleCard}>
                        <img 
                            src={a.heroImage} 
                            alt={a.title}
                            className={styles.cardImage}
                        />
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>{a.title}</h3>
                            <p className={styles.cardDate}>
                                {new Date(a.eventDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </a>
            ))}
        </div>
        </>
    );
}

export default PublicArticleList;
