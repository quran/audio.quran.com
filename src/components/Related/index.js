import React, { PropTypes } from 'react';
const styles = require('./style.scss');
import Link from 'react-router/lib/Link';
const Related = ({related = [], qaris, toggle}) => {
  const li = related.map((item, index) => (<li className={styles.item} key={index}><Link className={styles.link} to={`/quran/${qaris[item].id}`}>{qaris[item].name}</Link></li>));
  return (
    <ul className={`${styles.container} ${toggle ? styles.active : ''}`}>{li}</ul>
 );
};

Related.PropTypes = {
  related: PropTypes.array.isRequired,
  qaris: PropTypes.any.isRequired
};

export default Related;
