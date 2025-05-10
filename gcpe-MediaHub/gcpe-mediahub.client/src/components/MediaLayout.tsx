import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MediaLayout.module.css';
import LeftNav from './LeftNav';
import Header from './MediaHeader';

const MediaLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <LeftNav />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MediaLayout;