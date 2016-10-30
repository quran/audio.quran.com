import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
const styles = require('./style.scss');
import isMobile from '../../utils/isMobile';
export default class Qaris extends Component {
  static propTypes = {
    qaris: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (isMobile()) {
      const stickyElements = Array.from(document.querySelectorAll(`.${styles.letter}`));
      stickyElements.map((element) => Stickyfill.add(element));
    }
  }

  render() {
    const { letter, qaris } = this.props.qaris;
    const cleanUp = (name) => (name.replace(/(\d|\[|\().*/g, ''));

    if (qaris.length < 1) return false;

    return (
      <div className={styles.container}>
        <span className={`${styles.letter} sticky`}>{letter}</span>
        <ul className={styles.list}>
          {qaris.map((qari, index) => (<li key={index} className={styles.listItem}><Link className={styles.link} to={`/quran/${qari.id}`}>{cleanUp(qari.name)}</Link></li>))}
        </ul>

      </div>
    );
  }
}
