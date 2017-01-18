import React from 'react';
// import Col from 'react-bootstrap/lib/Col';
const styles = require('./style.scss');
export default () => (
  <div className={styles.header} fluid>
      <div className={styles.heading__parent}>
        <h1 className={styles.heading__text}>QuranicAudio</h1>
      </div>
  </div>
);
