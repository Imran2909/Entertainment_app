import React from 'react';
import styles from './Modal.module.css';

const Modal2 = ({ show, handleClose, handleLogin }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>You are not authenticated</h2>
        <p>Please login first</p>
        <div className={styles.modalActions}>
          <button onClick={handleClose} className={styles.leaveButton}>Leave anyway</button>
          <button onClick={handleLogin} className={styles.loginButton}>Proceed to login</button>
        </div>
      </div>
    </div>
  );
};

export default Modal2;
