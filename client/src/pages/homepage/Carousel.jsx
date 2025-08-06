import React, { useState, useEffect } from 'react';
import styles from './Carousel.module.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://cdn.shopify.com/s/files/1/0532/0622/0960/files/changing-lives.jpg?v=1645020225',
      title: 'We are changing lives! So we want you too be with us ',
    },
    {
      id: 2,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4VQCgRw8FIXbFqKTpnebyyTZmNQDplJR__A&s',
      title: 'Education Opens Doors',
    },
    {
      id: 3,
      image: 'https://www.billabonghighschool.com/blogs/wp-content/uploads/2024/02/ICSE-Board-.jpg',
      title: 'Building Tomorrow',
    }
  ];

  const missionStatement = `Aarambh aims to be the catalyst for positive change, focusing on
            accessible education, quality healthcare, and dignified elder care.
            We are driven by the belief that love, laughter, and limitless
            possibilities are the birthright of every person we serve.`;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className={styles.carouselContainer}>
      {/* Mission Statement */}
      <div className={styles.missionSection}>
        <div className={styles.missionContent}>
          <h2 className={styles.missionTitle}>Mission Statement</h2>
          <p className={styles.missionText}>{missionStatement}</p>
        </div>
      </div>

      {/* Carousel */}
      <div className={styles.carouselSection}>
        <div className={styles.carouselWrapper}>
          <div className={styles.slideContainer}>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
              >
                <div className={styles.slideContent}>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={styles.slideImage}
                  />
                  <div className={styles.slideOverlay}>
                    <h3 className={styles.slideTitle}>{slide.title}</h3>
                    <p className={styles.slideDescription}>{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            &#8249;
          </button>
          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={nextSlide}
            aria-label="Next slide"
          >
            &#8250;
          </button>

          {/* Dots */}
          <div className={styles.dotsContainer}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={styles.callToAction}>
          <p>Discover our inspiring stories – explore articles and become part of the change.</p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
