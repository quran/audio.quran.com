import React from 'react';
import Link from 'react-router/lib/Link';
const styles = require('./styles.scss');

export default ({}) => {
  return (
        <ul className={styles.navContainer}>
            <li><Link to="/about">About</Link></li>
            <li><a href="https://quran.zendesk.com/hc/en-us/requests/new">Contact Us</a></li>
        </ul>
    );
};
