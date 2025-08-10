import React, { useState } from 'react';
import styles from './addArticleForm.module.css';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const AddArticleForm = ({ setIsFormActive }) => {
    const [formData, setFormData] = useState({
        title: '',
        eventDate: '',
        heroImage: null,
        overview: '',
        carouselImages: []
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [carouselPreviews, setCarouselPreviews] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setFormData(prev => ({
                    ...prev,
                    heroImage: file
                }));

                // Create preview
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImagePreview(e.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select a valid image file');
            }
        }
    };

    const handleCarouselImageUpload = (e) => {
        const files = Array.from(e.target.files);
        
        if (files.length === 0) return;

        // Check if adding these files would exceed the limit
        if (formData.carouselImages.length + files.length > 10) {
            alert(`You can only upload up to 10 carousel images. Currently you have ${formData.carouselImages.length} images.`);
            return;
        }

        // Validate all files are images
        const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
        if (invalidFiles.length > 0) {
            alert('Please select only valid image files');
            return;
        }

        // Add new images to existing ones
        const newCarouselImages = [...formData.carouselImages, ...files];
        setFormData(prev => ({
            ...prev,
            carouselImages: newCarouselImages
        }));

        // Create previews for new images
        const newPreviews = [...carouselPreviews];
        files.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                newPreviews.push(e.target.result);
                if (newPreviews.length === carouselPreviews.length + files.length) {
                    setCarouselPreviews(newPreviews);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const removeCarouselImage = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            carouselImages: prev.carouselImages.filter((_, index) => index !== indexToRemove)
        }));
        setCarouselPreviews(prev => prev.filter((_, index) => index !== indexToRemove));
    };


    const handleSubmit = async (e) => {
        console.log(BACKEND_URL);
        e.preventDefault();
        if (!window.confirm('Are you sure you want to submit?')) {
            return;
        }
        console.log(formData);
        setIsSubmitting(true);


        // Create FormData for file upload
        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('eventDate', formData.eventDate);
        submitData.append('overview', formData.overview);

        if (formData.heroImage) {
            submitData.append('heroImage', formData.heroImage);
        }

        // Append carousel images
        formData.carouselImages.forEach((image, index) => {
            submitData.append('carouselImages', image);
        });

        console.log('FormData contents:');
        for (let [key, value] of submitData.entries()) {
            if (value instanceof File) {
                console.log(key + ':', value.name, value.size + ' bytes');
            } else {
                console.log(key + ':', value);
            }
        }

        await axios.post(`${BACKEND_URL}/articles/`, submitData, {
            withCredentials: true
        })
            .then((response) => {
                console.log(response);
                setFormData({
                    title: '',
                    eventDate: '',
                    heroImage: null,
                    overview: '',
                    carouselImages: []
                });
                setImagePreview(null);
                setCarouselPreviews([]);
                setIsFormActive(false);
            })
            .catch((err) => {
                console.log(`Cannot POST, due to : \n ${err}`);
                alert('Failed to create article');

            }).finally(() => { setIsSubmitting(false); })

    }


    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={() => { setIsFormActive(false) }}>Go Back</button>
            <h2 className={styles.title}>Add New Article</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Title Field */}
                <div className={styles.formGroup}>
                    <label htmlFor="title" className={styles.label}>
                        Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                        placeholder="Enter article title"
                    />
                </div>

                {/* Event Date Field */}
                <div className={styles.formGroup}>
                    <label htmlFor="eventDate" className={styles.label}>
                        Event Date *
                    </label>
                    <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                    />
                </div>

                {/* Hero Image Upload */}
                <div className={styles.formGroup}>
                    <label htmlFor="heroImage" className={styles.label}>
                        Hero Image *
                    </label>
                    <div className={styles.imageUpload}>
                        <input
                            type="file"
                            id="heroImage"
                            accept="image/*"
                            onChange={handleImageUpload}
                            required
                            className={styles.fileInput}
                        />
                        <label htmlFor="heroImage" className={styles.fileLabel}>
                            {formData.heroImage ? 'Change Image' : 'Choose Image'}
                        </label>
                        {imagePreview && (
                            <div className={styles.imagePreview}>
                                <img src={imagePreview} alt="Preview" className={styles.previewImage} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Carousel Images Upload */}
                <div className={styles.formGroup}>
                    <label htmlFor="carouselImages" className={styles.label}>
                        Carousel Images (Optional - Max 10)
                    </label>
                    <div className={styles.imageUpload}>
                        <input
                            type="file"
                            id="carouselImages"
                            accept="image/*"
                            multiple
                            onChange={handleCarouselImageUpload}
                            className={styles.fileInput}
                        />
                        <label htmlFor="carouselImages" className={styles.fileLabel}>
                            {formData.carouselImages.length > 0 ? 'Add More Images' : 'Choose Images'}
                        </label>
                        <div className={styles.carouselInfo}>
                            {formData.carouselImages.length}/10 images selected
                        </div>
                        {carouselPreviews.length > 0 && (
                            <div className={styles.carouselPreviewContainer}>
                                {carouselPreviews.map((preview, index) => (
                                    <div key={index} className={styles.carouselImageItem}>
                                        <img src={preview} alt={`Carousel ${index + 1}`} className={styles.carouselPreviewImage} />
                                        <button
                                            type="button"
                                            onClick={() => removeCarouselImage(index)}
                                            className={styles.removeImageButton}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>



                {/* Overview */}
                <div className={styles.formGroup}>
                    <label htmlFor="overview" className={styles.label}>
                        Overview *
                    </label>
                    <textarea
                        id="overview"
                        name="overview"
                        value={formData.overview}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        className={styles.textarea}
                        placeholder="Enter article overview"
                    />
                </div>


                {/* Submit Button */}
                <div className={styles.submitGroup}>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.submitButton}
                    >
                        {isSubmitting ? 'Creating Article...' : 'Create Article'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddArticleForm;