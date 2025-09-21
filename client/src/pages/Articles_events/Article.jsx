import styles from "./Article.module.css";
import { useState } from "react";

function Article({ title, image, date, content, carousel }) {
  const[current, setCurrent] = useState(0);
  const next = () => setCurrent((prev) => (prev+1)%carousel.length);
  const prev = () => setCurrent((prev) => (prev-1+carousel.length)%carousel.length);

  return (
    <div className={styles.articlePage}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.date}>📅 {date}</p>
      <img className={styles.image} src={image} alt="Article" />
      <div className={styles.content}>
        {content.split("\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {carousel && carousel.length > 0 && (
        <div className={styles.carousel}>
          <button onClick={prev}>⟵</button>
          
          {/* Stacked Image Effect - Preserves your carousel sizing */}
          <div className={styles.stackedImageContainer}>
            <img 
              className={styles.backgroundImage} 
              src={carousel[current]} 
              alt="Carousel Background" 
            />
            <img
              src={carousel[current]}
              className={styles.foregroundImage}
              alt="Carousel"
            />
          </div>
          
          <button onClick={next}>⟶</button>
        </div>
      )}
    </div>
  );
}

export default Article;
