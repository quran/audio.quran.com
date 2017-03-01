import React, { Component, PropTypes } from 'react';
import browserHistory from 'react-router/lib/browserHistory';
import Link from 'react-router/lib/Link';
const styles = require('./style.scss');
export default class QarisList extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    section: PropTypes.number.isRequired
  };

  render() {
    const { data, section } = this.props;
    const { letter, qaris} = data;
    const filterBasedOnSection = qaris.filter((item) => item.sectionId === section);

    if (qaris.length < 1 || filterBasedOnSection.length < 1) return false;

    return (
      <div className={styles.container}>
        <span className={`${styles.letter} ${letter === 'I' ? styles.slimLetter : ''}`}>{letter}</span>
        <ul className={styles.list}>
          {filterBasedOnSection.filter((item) => (item.sectionId === section && item.home)).map((qari, index) => (<li key={index} className={styles.listItem} onClick={() => browserHistory.push(`/quran/${qari.id}`)}><Link className={styles.link} to={`/quran/${qari.id}`}>{qari.name}</Link></li>))}
        </ul>

      </div>
    );
  }
}
