import React from 'react';
import styles from './Modal.module.css'; // Ensure the path and styles are correct

const Modal2 = ({ message, onClose, onConfirm }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{message}</h2>
        <div className={styles.modalButtons}>
          <button onClick={onClose}>Leave Anyway</button>
          <button onClick={onConfirm}>Go to Login</button>
        </div>
      </div>
    </div>
  );
};

export default Modal2;
