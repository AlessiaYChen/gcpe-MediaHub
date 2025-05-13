import React from 'react';
import logo from '../assets/logo.svg';
import styles from './MediaHeader.module.css';

const MediaHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '16px' }} />
    </header>
  );
};

export default MediaHeader;