import React from 'react';
import styles from './BlackWhite.module.css';

const BlackWhite = ({ imageUrl, children }) => {
  return (
    <div className={styles.stickyWrapper}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default BlackWhite;