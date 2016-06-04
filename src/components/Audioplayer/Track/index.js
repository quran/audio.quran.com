import React, { Component, PropTypes } from 'react';

const styles = require('./style.scss');

export default class Track extends Component {
  static propTypes = {
    progress: PropTypes.number.isRequired
  };

  state = {
    currentTime: 0
  };

  render() {
    const { progress } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.progress} style={{width: `${progress}%`}}/>
      </div>
    );
  }
}
