import styles from './articleCard.module.css';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function ArticleCard({ article, setIsModifyFormActive, setArticleToModify }) {
    // Function to truncate overview text to 80 characters
    const truncateOverview = (text, maxLength = 80) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    async function handleDelete() {
        const articleID = article._id;
        await axios.delete(`${BACKEND_URL}/articles/${articleID}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                alert(`Delete Unsuccessful`);
                console.log(err);
            });
    }

    return (
        <div className={styles.articleCard}>
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{article.title}</h3>
                <div className={styles.cardImageContainer}>
                    <img
                        src={article.heroImage}
                        alt={article.title}
                        className={styles.cardImage}
                    />
                </div>
                <p className={styles.cardDate}>{article.eventDate}</p>
                <p className={styles.cardOverview}>{truncateOverview(article.overview)}</p>
                <div className={styles.cardActions}>
                    <button className={styles.editBtn} onClick={() => {
                        setArticleToModify(article);
                        setIsModifyFormActive(true);
                    }}>
                        Edit
                    </button>
                    <button onClick={handleDelete} className={styles.deleteBtn}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
