import { useDebugValue, useEffect, useState } from "react";
import axios from 'axios';
import ArticleCard from "./articleCard";
import styles from "./articleList.module.css";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ArticleList({ setIsModifyFormActive, setArticleToModify, searchFilter }) {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, toggleRefresh] = useState(false);
    useEffect(() => {

        async function fetchArticles() {
            try {
                const response = await fetch(`${BACKEND_URL}/articles/`, {
                    credentials: 'include'
                });
                if (!response.ok) {
                    // If response is not OK (e.g., 404, 500), throw an error
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                setArticles(data);
            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchArticles();
    }, [refresh]);

    useEffect(() => {
        if (!searchFilter)
            setFilteredArticles(articles)
        else {
            const lowercasedFilter = searchFilter.toLowerCase();
            const trimmedFilter = lowercasedFilter.trim();
            const filtered = articles.filter(article =>
                article.title.toLowerCase().includes(trimmedFilter)
            );
            setFilteredArticles(filtered);
        }
    }, [searchFilter, articles]);

    async function handleDelete(articleID) {
        if (!window.confirm("Are you sure you want to delete this Article"))
            return;
        await axios.delete(`${BACKEND_URL}/articles/${articleID}`, {
            withCredentials: true
        })
            .then((response) => {
                console.log(response.data);
                alert(`Delete Successful`);
                toggleRefresh(refresh => !refresh);
            })
            .catch((err) => {
                alert(`Delete Unsuccessful`);
                console.log(err);
            });
    }

    if (loading) {
        return <p>Loading articles...</p>;
    }

    if (error) {
        return <p>Error loading articles: {error}</p>;
    }

    return (
        <div className={styles.articleList}>
            {filteredArticles.map(article => (
                <ArticleCard key={article._id} article={article} setArticleToModify={setArticleToModify} setIsModifyFormActive={setIsModifyFormActive}
                    handleDelete={handleDelete} />
            ))}
        </div>
    );
}