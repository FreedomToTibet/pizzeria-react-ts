import React from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />I can't find nothing
      </h1>
      <h2 className={styles.description}>Unfortunately this page doesn't exist</h2>
    </div>
  );
};

export default NotFoundBlock;
