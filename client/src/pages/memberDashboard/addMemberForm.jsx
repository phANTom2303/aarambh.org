import { useState } from "react";
import axios from "axios";
import styles from './addMemberForm.module.css'; // Import CSS module

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AddMemberForm({ setIsFormActive }) {
    const [name, setName] = useState(null);
    const [phoneNum, setPhoneNum] = useState(null);
    const [email, setEmail] = useState(null);
    const [dateOfJoin, setDateOfJoin] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'phoneNum':
                setPhoneNum(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'dateOfJoin':
                setDateOfJoin(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!window.confirm('Are you sure you want to submit?')) {
            return;
        }
        const formData = { name, phoneNum, email, dateOfJoin };
        console.log('Form submitted:', formData);

        axios.post(`${BACKEND_URL}/members/`, { ...formData }, {
            withCredentials: true
        })
            .then((response) => {
                alert("User Created successfully");
                setName('');
                setPhoneNum(null);
                setEmail(null);
                setDateOfJoin(null);
            })
            .catch((error) => {
                if (error.response) {
                    const statusCode = error.response.status;
                    const errorMessage = error.response.data?.msg || 'An error occurred.';
                    alert(`${errorMessage}`);
                } else if (error.request) {
                    alert('Network Error: Could not connect to the server. Please check your connection and try again.');
                } else {
                    alert(`Request Error: ${error.message}`);
                }
            }).finally(() => {
                setIsFormActive(false);
            });
    };

    return (
        <div className={styles.formContainer}> {/* Use styles.formContainer */}
            <button className={styles.backButton} onClick={() => { setIsFormActive(false) }}>Go Back</button>
            <h2 className={styles.formTitle}>Add New Member</h2> {/* Use styles.formTitle */}
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}> {/* Use styles.formGroup */}
                    <label htmlFor="name" className={styles.formLabel}>Name *</label> {/* Use styles.formLabel */}
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required
                        className={styles.formInput} // Use styles.formInput
                    />
                </div>

                <div className={styles.formGroup}> {/* Use styles.formGroup */}
                    <label htmlFor="phoneNum" className={styles.formLabel}>Phone Number *</label> {/* Use styles.formLabel */}
                    <input
                        type="tel"
                        id="phoneNum"
                        name="phoneNum"
                        value={phoneNum}
                        onChange={handleChange}
                        className={styles.formInput} // Use styles.formInput
                    />
                </div>

                <div className={styles.formGroup}> {/* Use styles.formGroup */}
                    <label htmlFor="email" className={styles.formLabel}>Email</label> {/* Use styles.formLabel */}
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        className={styles.formInput} // Use styles.formInput
                    />
                </div>

                <div className={styles.formGroup}> {/* Use styles.formGroup */}
                    <label htmlFor="dateOfJoin" className={styles.formLabel}>Date of Joining *</label> {/* Use styles.formLabel */}
                    <input
                        type="date"
                        id="dateOfJoin"
                        name="dateOfJoin"
                        value={dateOfJoin}
                        onChange={handleChange}
                        className={styles.formInput} // Use styles.formInput
                    />
                </div>

                <button type="submit" className={styles.submitButton}>Submit</button> {/* Use styles.submitButton */}
            </form>
        </div>
    );
};
