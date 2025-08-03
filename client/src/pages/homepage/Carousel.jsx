import { useEffect, useState } from "react";
import './Carousel.css';

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
            <div className="carousel-container">
                <div className="carousel-loading">Loading...</div>
            </div>
        );
    }

    if (slides.length === 0) return null;

    const currentSlideData = slides[currentSlide];

    return (
        <div className="carousel-container">
            <div className="hero-slide">
                <div className="slide-content">
                    <div className="slide-title">
                        <h2>{currentSlideData.name}</h2>
                    </div>
                    <div className="image-container">
                        <img
                            src={currentSlideData.URL}
                            alt={currentSlideData.name}
                            className="hero-image"
                        />
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="carousel-controls">
                {/* Arrows */}
                <button className="carousel-btn prev-btn" onClick={prevSlide}>‹</button>
                
                {/* Dots indicator */}
                <div className="carousel-dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
                
                <button className="carousel-btn next-btn" onClick={nextSlide}>›</button>
            </div>
        </div>
    );
}

export default Carousel;