// src/components/Main/index.jsx

import React, { useState } from "react";
import styles from "./styles.module.css";
import SecretForm from "../SecretForm"; 
import SecretsDisplay from "../SecretDisplay";
const Main = () => {
  const [isHelloWorldOpen, setHelloWorldOpen] = useState(false);
  const [isSecretFormOpen, setSecretFormOpen] = useState(false);

  const [isSecretRvealOpen, setSecretRevealOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };


  const handleSecretFormTabClick = () => {
    setSecretFormOpen(!isSecretFormOpen);
    setHelloWorldOpen(false); 
  };
  const handleSecretRevealTabClick = () => {
    setSecretRevealOpen(!isSecretRvealOpen);
    setHelloWorldOpen(false);
  };
  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>SECRET.DO</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className={styles.centered_content}>
        <p className={styles.static_message}>Discover and Share Secrets</p>
        <div className={styles.centered_buttons}>
          <button className={styles.green_btn} onClick={handleSecretFormTabClick}>
            Publish Secret
          </button>
          <button className={styles.blue_btn} onClick={handleSecretRevealTabClick}>
            Reveal Secrets
          </button>
        </div>
      </div>


	{isSecretFormOpen && (
        <div className={styles.modal}>
          <SecretForm />
          <button onClick={() => setSecretFormOpen(false)} className={styles.closeButton}>Close</button>
        </div>
      )}

      {isSecretRvealOpen && (
        <div className={styles.modal}>
          <SecretsDisplay />
          <button onClick={() => setSecretRevealOpen(false)} className={styles.closeButton}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Main;
