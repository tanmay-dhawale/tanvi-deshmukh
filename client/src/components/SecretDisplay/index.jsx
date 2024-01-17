import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css'; 

const SecretsDisplay = () => {
    const [secrets, setSecrets] = useState([]);

    useEffect(() => {
        const fetchSecrets = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/secrets');
                setSecrets(response.data);
            } catch (error) {
                // Handle error
            }
        };

        fetchSecrets();
    }, []);

    return (
        <div className={styles.secretsContainer}>
            {secrets.map((secret, index) => (
                <div key={index} className={styles.secretCard}>
                    <p className={styles.secretMessage}>{secret}</p>
                </div>
            ))}
        </div>
    );
};

export default SecretsDisplay;
