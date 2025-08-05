import { useEffect, useState } from "react";
import axios from 'axios';
import ArticleCard from "./articleCard";
import styles from "./articleList.module.css";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ArticleList({ setIsModifyFormActive, setArticleToModify }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, toggleRefresh] = useState(false);
    useEffect(() => {

        async function fetchArticles() {
            try {
                const response = await fetch("http://localhost:4000/articles/");
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

    async function handleDelete(articleID) {
        await axios.delete(`${BACKEND_URL}/articles/${articleID}`)
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
            {articles.map(article => (
                <ArticleCard key={article._id} article={article} setArticleToModify={setArticleToModify} setIsModifyFormActive={setIsModifyFormActive}
                    handleDelete={handleDelete} />
            ))}
        </div>
    );
}