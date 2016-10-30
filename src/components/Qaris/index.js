import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
const styles = require('./style.scss');
import isMobile from '../../utils/isMobile';
export default class Qaris extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    section: PropTypes.number.isRequired
  };

  componentDidMount() {
    if (isMobile()) {
      const stickyElements = Array.from(document.querySelectorAll(`.${styles.letter}`));
      stickyElements.map((element) => Stickyfill.add(element));
    }
  }

  render() {
    const { data, section } = this.props;
    const { letter, qaris} = data;
    const filterBasedOnSection = qaris.filter((item) => item.sectionId === section);

    if (qaris.length < 1 || filterBasedOnSection.length < 1) return false;

    return (
      <div className={styles.container}>
        <span className={`${styles.letter} sticky`}>{letter}</span>
        <ul className={styles.list}>
          {filterBasedOnSection.filter((item) => (item.sectionId === section && item.home)).map((qari, index) => (<li key={index} className={styles.listItem}><Link className={styles.link} to={`/quran/${qari.id}`}>{qari.name}</Link></li>))}
        </ul>

      </div>
    );
  }
}
