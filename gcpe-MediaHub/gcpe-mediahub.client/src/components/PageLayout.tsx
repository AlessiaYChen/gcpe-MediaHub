import React, { ReactNode } from 'react';
import { makeStyles } from '@fluentui/react-components';
import LeftNav from './LeftNav';

interface PageLayoutProps {
  children: ReactNode;
}

// Define styles for the page layout
const useStyles = makeStyles({
  pageLayout: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  },
  mainContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100vh',
    overflow: 'hidden',
  },
  mainContent: {
    padding: '24px',
    margin: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }
});

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const styles = useStyles();

  return (
    <div className={styles.pageLayout}>
      {/* Left Navigation */}
      <LeftNav />

      {/* Main Content Area */}
      <div className={styles.mainContentContainer}>
        <div className={styles.mainContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;