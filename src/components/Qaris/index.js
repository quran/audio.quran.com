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
        return (<li key={index} className={styles.listItem}><Link to={`/quran/${qari.id}`}>{cleanUp(qari.name)}</Link></li>);
      });
    } else {
      list = (<li>We dont have reciters that starts with “{letter}” Suggest here</li>);
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
