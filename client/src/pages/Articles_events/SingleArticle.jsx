import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Article from './Article';
import styles from './Article.module.css';
import Header from '../homepage/Header';
import HeaderSpacer from '../../components/headerSpacer/headerSpacer';
import Footer from '../../components/Footer/Footer';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function SingleArticle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [articleData, setArticleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BACKEND_URL}/articles/${id}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch article');
                }

                if (data.article) {
                    // Transform the article data to match the Article component props
                    const transformedData = {
                        title: data.article.title,
                        image: data.article.heroImage,
                        date: new Date(data.article.eventDate).toLocaleDateString(),
                        content: data.article.overview,
                        carousel: data.article.sections && data.article.sections.length > 0
                            ? data.article.sections.map(section => ({ src: section.image }))
                            : []
                    };
                    setArticleData(transformedData);
                } else {
                    throw new Error('Article data not found');
                }
            } catch (err) {
                console.error('Error fetching article:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchArticle();
        }
    }, [id]);

    if (loading) {
        return (
            <div className={styles.articlePage}>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>Loading article...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.articlePage}>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <h2>Error</h2>
                    <p>{error}</p>
                    <button
                        onClick={() => navigate('/activities')}
                        style={{
                            padding: '0.5rem 1rem',
                            marginTop: '1rem',
                            cursor: 'pointer'
                        }}
                    >
                        Back to Articles
                    </button>
                </div>
            </div>
        );
    }

    if (!articleData) {
        return (
            <div className={styles.articlePage}>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>Article not found</p>
                    <button
                        onClick={() => navigate('/activities')}
                        style={{
                            padding: '0.5rem 1rem',
                            marginTop: '1rem',
                            cursor: 'pointer'
                        }}
                    >
                        Back to Articles
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <Article {...articleData} />
            <Footer></Footer>
        </>
    );
}
