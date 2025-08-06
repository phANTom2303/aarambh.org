import { useEffect, useState } from "react";
import Article from "./Article";
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
        <div className={styles.articleContainer}>
            {articles.map((a) => (
                <Article
                    key={a._id}
                    title={a.title}
                    content={
                        a.overview.length > 100
                            ? a.overview.slice(0, 100) + "..."
                            : a.overview
                    }
                    image={a.heroImage}
                    date={new Date(a.eventDate).toLocaleDateString()}
                />
            ))}
        </div>
        </>
    );
}

export default PublicArticleList;
