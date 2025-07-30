import React, { useState } from 'react';
import styles from './addArticleForm.module.css';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const AddArticleForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        eventDate: '',
        heroImage: null,
        topics: [''],
        overview: '',
        sections: [{ subheading: '', text: '' }]
    });

    const [imagePreview, setImagePreview] = useState(null);
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

    const handleTopicChange = (index, value) => {
        const newTopics = [...formData.topics];
        newTopics[index] = value;
        setFormData(prev => ({
            ...prev,
            topics: newTopics
        }));
    };

    const addTopic = () => {
        setFormData(prev => ({
            ...prev,
            topics: [...prev.topics, '']
        }));
    };

    const removeTopic = (index) => {
        if (formData.topics.length > 1) {
            const newTopics = formData.topics.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                topics: newTopics
            }));
        }
    };

    const handleSectionChange = (index, field, value) => {
        const newSections = [...formData.sections];
        newSections[index] = {
            ...newSections[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            sections: newSections
        }));
    };

    const addSection = () => {
        setFormData(prev => ({
            ...prev,
            sections: [...prev.sections, { subheading: '', text: '' }]
        }));
    };

    const removeSection = (index) => {
        if (formData.sections.length > 1) {
            const newSections = formData.sections.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                sections: newSections
            }));
        }
    };

    const handleSubmit = async (e) => {
        console.log(BACKEND_URL);
        e.preventDefault();
        console.log(formData);
        setIsSubmitting(true);

        try {
            // Create FormData for file upload
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('eventDate', formData.eventDate);
            submitData.append('overview', formData.overview);

            // Filter out empty topics
            const validTopics = formData.topics.filter(topic => topic.trim() !== '');
            submitData.append('topics', JSON.stringify(validTopics));

            // Filter out empty sections
            const validSections = formData.sections.filter(section =>
                section.subheading.trim() !== '' || section.text.trim() !== ''
            );
            submitData.append('sections', JSON.stringify(validSections));

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

            await axios.post(`${BACKEND_URL}/articles/test`, submitData)
                .then((response) => { console.log(response) })
                .catch((err) => { console.log(`Cannot POST, due to : \n ${err}`) });

            // TODO: Replace with actual API endpoint
            //   const response = await fetch('/api/articles', {
            //     method: 'POST',
            //     body: submitData
            //   });

            //   if (response.ok) {
            //     alert('Article created successfully!');
            //     // Reset form
            //     setFormData({
            //       title: '',
            //       eventDate: '',
            //       heroImage: null,
            //       topics: [''],
            //       overview: '',
            //       sections: [{ subheading: '', text: '' }]
            //     });
            //     setImagePreview(null);
            //   } else {
            //     throw new Error('Failed to create article');
            //   }
        } catch (error) {
            console.error('Error creating article:', error);
            alert('Error creating article. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
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

                {/* Topics */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>Topics</label>
                    {formData.topics.map((topic, index) => (
                        <div key={index} className={styles.topicRow}>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => handleTopicChange(index, e.target.value)}
                                placeholder="Enter topic"
                                className={styles.input}
                            />
                            {formData.topics.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeTopic(index)}
                                    className={styles.removeButton}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addTopic}
                        className={styles.addButton}
                    >
                        Add Topic
                    </button>
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

                {/* Sections */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>Sections</label>
                    {formData.sections.map((section, index) => (
                        <div key={index} className={styles.sectionGroup}>
                            <div className={styles.sectionHeader}>
                                <h4>Section {index + 1}</h4>
                                {formData.sections.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeSection(index)}
                                        className={styles.removeButton}
                                    >
                                        Remove Section
                                    </button>
                                )}
                            </div>

                            <input
                                type="text"
                                value={section.subheading}
                                onChange={(e) => handleSectionChange(index, 'subheading', e.target.value)}
                                placeholder="Section subheading"
                                className={styles.input}
                            />

                            <textarea
                                value={section.text}
                                onChange={(e) => handleSectionChange(index, 'text', e.target.value)}
                                placeholder="Section content"
                                rows="3"
                                className={styles.textarea}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addSection}
                        className={styles.addButton}
                    >
                        Add Section
                    </button>
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