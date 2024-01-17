import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { jwtDecode } from 'jwt-decode';
const SecretForm = () => {
    const [secret, setSecret] = useState('');

    // Decode the JWT to get the user's email
    const token = localStorage.getItem('token');
    console.log("token: " + token);
    const decoded = jwtDecode(token);
    const userEmail = decoded.email;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        // Define the URL for the POST request
        const url = 'http://localhost:8080/api/users/submit-secret';
            console.log("Email: " + userEmail);
        const payload = { secretMessage: secret + "$userEmail$"+ userEmail, userEmail: userEmail };
         // Make the POST request with the payload
         const response = await axios.post(url, payload);
    
    // Handle success
    console.log(response.data);
    setSecret(''); 

    } catch (error) {
    
    if (error.response && error.response.status === 404) {
        console.error('Endpoint not found. Please check the server route.');
    } else {
        console.error('An error occurred:', error.message);
    }
}
};

    return (
        <form onSubmit={handleSubmit} className={styles.secretForm}>
            <textarea 
                className={styles.secretTextarea}
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Share your secret"
            />
            <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
    );
};

export default SecretForm;
