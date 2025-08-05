import styles from './articleCard.module.css';
export default function ArticleCard({ article, setIsModifyFormActive, setArticleToModify, handleDelete }) {
    // Function to truncate overview text to 80 characters
    const truncateOverview = (text, maxLength = 80) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };



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
                    <button onClick={() => handleDelete(article.id)} className={styles.deleteBtn}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
