import React from 'react';
import styles from './memberCard.module.css';


const MemberCard = ({ name, memberID, phoneNumber, email, dateOfJoining, deleteFunction }) => {
    // Format date of joining for better readability
    // const formatDate = (dateString) => {
    //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
    //     return new Date(dateString).toLocaleDateString(undefined, options);
    // };

    return (
        <div className={styles.memberCard}>
            <div className={styles.memberCardHeader}>
                <h2 className={styles.memberCardName}>{name}</h2>
                <div className={styles.memberCardControls}>
                    <button>✏️Modify</button>
                    <button onClick={() => deleteFunction(memberID)}>🚫Delete</button>
                </div>
            </div>
            <div className={styles.memberCardBody}>
                <div className={styles.memberCardInfo}>
                    <span className={styles.memberCardLabel}>Phone:</span>
                    <span className={styles.memberCardValue}>{phoneNumber}</span>
                </div>
                {email &&
                    <div className={styles.memberCardInfo}>
                        <span className={styles.memberCardLabel}>Email : </span>
                        <span className={styles.memberCardValue}>{email}</span>
                    </div>
                }
                <div className={styles.memberCardInfo}>
                    <span className={styles.memberCardLabel}>Member since:</span>
                    <span className={styles.memberCardValue}>{dateOfJoining}</span>
                </div>

            </div>
        </div>
    );
};

export default MemberCard;