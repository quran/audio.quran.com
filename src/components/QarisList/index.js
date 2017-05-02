import React, { Component, PropTypes } from 'react';
import browserHistory from 'react-router/lib/browserHistory';
import Link from 'react-router/lib/Link';
import styles from './style.scss';
export default class QarisList extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    section: PropTypes.number.isRequired
  };

  render() {
    const { data, section } = this.props;
    const { letter, qaris } = data;
    const filterBasedOnSection = qaris.filter(
      item => item.sectionId === section
    );

    if (qaris.length < 1 || filterBasedOnSection.length < 1) return false;

    const renderListItem = listItems => {
      return (
        <ul className={styles.list}>
          {listItems
            .filter(item => item.sectionId === section && item.home)
            .map((qari, index) => (
              <li
                key={index}
                className={styles.listItem}
                onClick={() => browserHistory.push(`/quran/${qari.id}`)}
              >
                <Link className={styles.link} to={`/quran/${qari.id}`}>
                  {qari.name}
                </Link>
              </li>
            ))}
        </ul>
      );
    };

    const isHaramainSection = section === 2;

    if (isHaramainSection) {
      const Madinah = filterBasedOnSection.filter(
        item => item.name.indexOf('Madinah') > -1
      );
      const Makkah = filterBasedOnSection.filter(
        item => item.name.indexOf('Makkah') > -1
      );

      return (
        <div className={styles.container}>
          <h2 className={styles.sectionSplitName}>Makkah</h2>
          {renderListItem(Makkah)}
          <h2 className={styles.sectionSplitName}>Madinah</h2>
          {renderListItem(Madinah)}
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <span
          className={`${styles.letter} ${letter === 'I' ? styles.slimLetter : ''}`}
        >
          {letter}
        </span>
        {renderListItem(filterBasedOnSection)}
      </div>
    );
  }
}
