import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ArticleList.module.css";
import Header from "../homepage/Header";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Date formatting function
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    
    const suffix = (d) => {
        if (d > 3 && d < 21) return "th";
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };
    
    const formatted = `${day}${suffix(day)} ${date.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
    })}`;
    
    return formatted;
}

function PublicArticleList() {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

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

    // Search articles
    const filteredArticles = articles.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className={styles.pageContainer}>
            <Header />
            <div className={styles.contentWrapper}>
                <p>Loading articles...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className={styles.pageContainer}>
            <Header />
            <div className={styles.contentWrapper}>
                <p>Error: {error}</p>
            </div>
        </div>
    );

    return (
        <div className={styles.pageContainer}>
            <Header />
            
            <div className={styles.contentWrapper}>
                <div className={styles.heroSection}>
                    <h2 className={styles.pageTitle}>Activities</h2>
                    <p className={styles.introText}>
                        Discover our latest activities and events - showcasing the impact we're making in our community through various initiatives and programs.
                    </p>
                    
                    <div className={styles.searchContainer}>
                        <input 
                            type="text" 
                            placeholder="Search articles..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchBar}
                        />
                    </div>
                </div>

                <div className={styles.articleGrid}>
                    {filteredArticles.map((a) => (
                        <Link key={a._id} to={`/activity/${a._id}`} className={styles.cardLink}>
                            <div className={styles.articleCard}>
                                <img 
                                    src={a.heroImage} 
                                    alt={a.title}
                                    className={styles.cardImage}
                                />
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{a.title}</h3>
                                    <p className={styles.cardDate}>
                                        {formatDate(a.eventDate)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PublicArticleList;
