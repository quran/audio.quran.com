import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
const styles = require('./style.scss');
export default class Qaris extends Component {
  static propTypes = {
    qaris: PropTypes.object.isRequired
  };

  render() {
    const { letter, qaris } = this.props.qaris;
    const cleanUp = (name) => (name.replace(/(\d|\[|\().*/g, ''));

    if (qaris.length < 1) return false;

    return (
      <div className={styles.container}>
        <span className={styles.letter}>{letter}</span>
        <ul className={styles.list}>
          {qaris.map((qari, index) => (<li key={index} className={styles.listItem}><Link className={styles.link} to={`/quran/${qari.id}`}>{cleanUp(qari.name)}</Link></li>))}
        </ul>

      </div>
    );
  }
}
