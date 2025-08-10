import React, { useState } from 'react';
import styles from './addArticleForm.module.css';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const ModifyArticleForm = ({ setIsModifyFormActive, article }) => {
    const [formData, setFormData] = useState({
        title: article.title,
        eventDate: article.eventDate,
        heroImage: article.heroImage,
        overview: article.overview,
    });

    const [imagePreview, setImagePreview] = useState(article.heroImage);
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

        console.log('FormData contents:');
        for (let [key, value] of submitData.entries()) {
            if (value instanceof File) {
                console.log(key + ':', value.name, value.size + ' bytes');
            } else {
                console.log(key + ':', value);
            }
        }


        await axios.patch(`${BACKEND_URL}/articles/${article._id}`, submitData, {
            withCredentials: true
        })
            .then((response) => {
                console.log(response);
                setFormData({
                    title: '',
                    eventDate: '',
                    heroImage: null,
                    overview: '',
                });
                setImagePreview(null);
                setIsModifyFormActive(false);
            })
            .catch((err) => {
                console.log(`Cannot PATCH, due to : \n ${err}`);
                alert('Failed to modify article');

            }).finally(() => { setIsSubmitting(false); })
    };

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={() => { setIsModifyFormActive(false) }}>Go Back</button>
            <h2 className={styles.title}>Modify Article</h2>

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
                        {isSubmitting ? 'Modifying Article...' : 'Confirm Modify'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModifyArticleForm;