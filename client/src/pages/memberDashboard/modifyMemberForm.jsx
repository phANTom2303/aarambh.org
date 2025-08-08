import { useState } from "react";
import axios from "axios";
import styles from './addMemberForm.module.css'; // Import CSS module

export default function ModifyMemberForm({ setIsModifyFormActive, member }) {
    const [name, setName] = useState(member.name);
    const [phoneNum, setPhoneNum] = useState(member.phoneNum);
    const [email, setEmail] = useState(member.email);
    const [dateOfJoin, setDateOfJoin] = useState(member.dateOfJoin);

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
        
        const formData = { name, phoneNum, email, dateOfJoin };
        console.log('Form submitted:', formData);

        axios.patch(`http://localhost:4000/members/${member.id}`, {...formData})
            .then((response) => {
                alert("User Created successfully");
                setName('');
                setPhoneNum('');
                setEmail('');
                setDateOfJoin('');
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
                setIsModifyFormActive(false);
            });
    };

    return (
        <div className={styles.formContainer}> {/* Use styles.formContainer */}
            <h2 className={styles.formTitle}>Modify Member</h2> {/* Use styles.formTitle */}
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}> {/* Use styles.formGroup */}
                    <label htmlFor="name" className={styles.formLabel}>Name *</label> {/* Use styles.formLabel */}
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleChange}
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
                        required
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
                        required
                        className={styles.formInput} // Use styles.formInput
                    />
                </div>

                <button type="submit" className={styles.submitButton}>Submit</button> {/* Use styles.submitButton */}
            </form>
        </div>
    );
};
