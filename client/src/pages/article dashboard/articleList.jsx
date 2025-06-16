import { useEffect, useState } from "react";
import Article from "../../Article";

export default function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
    }, []);

    if (loading) {
        return <p>Loading articles...</p>;
    }

    if (error) {
        return <p>Error loading articles: {error}</p>;
    }

    return (<>
        {
            articles.map(article => (
                <div key={article._id}>
                    <Article

                        title={article.title}
                        summary={article.overview}
                        image={article.heroImage}
                    />
                    {article.eventDate}
                </div>
            ))
        }
    </>);
}