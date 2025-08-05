import { useEffect, useState } from "react";
import styles from './Carousel.module.css';

function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from backend (for now returning static array)
    useEffect(() => {
        // Simulating async operation as requested
        const fetchCarouselData = () => {
            setLoading(true);
            
            // Static array as per teammate's request
            // Each object contains 'name' (article name) and 'URL' (image URL)
            const articlesData = [
                {
                    name: 'We are changing lives!',
                    URL: 'https://cdn.shopify.com/s/files/1/0532/0622/0960/files/changing-lives.jpg?v=1645020225'
                },
                {
                    name: 'Healthcare for All',
                    URL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4VQCgRw8FIXbFqKTpnebyyTZmNQDplJR__A&s'
                },
                {
                    name: 'Education Opens Doors',
                    URL: 'https://www.billabonghighschool.com/blogs/wp-content/uploads/2024/02/ICSE-Board-.jpg'
                }
            ];
            
            setSlides(articlesData);
            setLoading(false);
        };

        fetchCarouselData();
    }, []);

    // Auto-slide
    useEffect(() => {
        if (slides.length === 0) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index) => setCurrentSlide(index);
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    if (loading) {
        return (
            <div className={styles.carouselContainer}>
                <div className={styles.carouselLoading}>Loading...</div>
            </div>
        );
    }

    if (slides.length === 0) return null;

    const currentSlideData = slides[currentSlide];

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.heroSlide}>
                <div className={styles.slideContent}>
                    <div className={styles.slideTitle}>
                        <h2>{currentSlideData.name}</h2>
                    </div>
                    <div className={styles.imageContainer}>
                        <img
                            src={currentSlideData.URL}
                            alt={currentSlideData.name}
                            className={styles.heroImage}
                        />
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className={styles.carouselControls}>
                {/* Arrows */}
                <button className={`${styles.carouselBtn} ${styles.prevBtn}`} onClick={prevSlide}>‹</button>
                
                {/* Dots indicator */}
                <div className={styles.carouselDots}>
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${currentSlide === index ? styles.active : ''}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
                
                <button className={`${styles.carouselBtn} ${styles.nextBtn}`} onClick={nextSlide}>›</button>
            </div>
        </div>
    );
}

export default Carousel;