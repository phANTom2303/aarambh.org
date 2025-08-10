import styles from "./Article.module.css";
import { useState } from "react";

function Article({ title, image, date, content, carousel }) {

  const[current, setCurrent] = useState(0);
  const next = () => setCurrent((prev) => (prev+1)%carousel.length); //wraps around to first image
  const prev = () => setCurrent((prev) => (prev-1+carousel.length)%carousel.length); //wraps around to last image

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
          <img
          src ={carousel[current]}
          className={styles.carouselImage}/>
          <button onClick={next}>⟶</button>
    </div>
      )}
      </div>
  );
}

export default Article;
