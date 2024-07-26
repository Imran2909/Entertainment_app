// Alert.jsx
import React, { useEffect } from 'react';
import styles from './Alert.module.css'; // Ensure this file is styled appropriately
import { AiOutlineClose } from 'react-icons/ai';

const Alert = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Automatically close the alert after the specified duration
    }, duration);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [onClose, duration]);

  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <span className={styles.message}>{message}</span>
      <button className={styles.closeButton} onClick={onClose}>
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default Alert;
