import { useState } from "react";
import axios from "axios";

export default function MemberForm({ setIsFormActive }) {
    const [name, setName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfJoin, setDateOfJoin] = useState('');

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

        axios.post('http://localhost:4000/members/', {...formData})
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
                setIsFormActive(false);
            });
    };

    return (
        <div className="member-form-container">
            <h2>Add New Member</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNum">Phone Number *</label>
                    <input
                        type="tel"
                        id="phoneNum"
                        name="phoneNum"
                        value={phoneNum}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dateOfJoin">Date of Joining *</label>
                    <input
                        type="date"
                        id="dateOfJoin"
                        name="dateOfJoin"
                        value={dateOfJoin}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};
