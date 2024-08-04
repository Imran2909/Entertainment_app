import React, { useEffect } from 'react';
import styles from './Alert.module.css';
import { AiOutlineClose } from 'react-icons/ai';

const Alert = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); 
    }, duration);

    return () => clearTimeout(timer); 
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
