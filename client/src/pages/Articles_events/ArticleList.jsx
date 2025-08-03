import { useEffect, useState } from "react";
import Article from "./Article";
import styles from "./ArticleList.module.css";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("http://localhost:4000/members/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data);
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
  if (articles.length === 0) return <p>No articles found.</p>;

  return (
    <div className={styles.articleContainer}>
      {articles.map((a) => (
        <Article
          key={a.id}
          title={a.title}
          summary={
            a.content.length > 100
              ? a.content.slice(0, 100) + "..." 
              : a.content
          }
          image={a.image}
          date={new Date(a.date).toLocaleDateString()}
        />
      ))}
    </div>
  );
}

export default ArticleList;
