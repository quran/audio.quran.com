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

    let list;
    if (qaris.length > 0) {
      list = qaris.map((qari, index) => {
        console.log(qari);
        return (<li key={index} className={styles.listItem}>
          <Link className={styles.link} to={`/quran/${qari.id}`}>{cleanUp(qari.name)}<span className={styles.arabicName}>{qari.arabicName}</span></Link>
          </li>);
      });
    } else {
      list = (<li className={styles.listItemError}>We dont have reciters that starts with “{letter}”.</li>);
    }

    return (
      <div className={styles.container}>
        <span className={styles.letter}>{letter}</span>
        <ul className={styles.list}>
          {list}
        </ul>

      </div>
    );
  }
}
