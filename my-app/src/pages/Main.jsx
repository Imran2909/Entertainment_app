import React from 'react';
import Sidebar from '../components/Sidebar';
import styles from './main.module.css';
import Allroutes from '../components/Allroutes';

function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.side}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Allroutes />
      </div>
    </div>
  );
}

export default Main;
