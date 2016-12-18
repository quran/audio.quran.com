import React, { Component, PropTypes } from 'react';

const styles = require('./style.scss');

export default class Track extends Component {
  static propTypes = {
    progress: PropTypes.number.isRequired,
    onTrackChange: PropTypes.func,
    simple: PropTypes.bool,
    style: PropTypes.any
  };

  handleClick = (event) => {
    const { onTrackChange, simple } = this.props;

    if (!simple) {
      const fraction = (
        event.nativeEvent.offsetX /
        this.refs.container.getBoundingClientRect().width
      );

      return onTrackChange(fraction);
    }
  }

  render() {
    const { progress, simple, style } = this.props;

    return (
      <div ref="container" className={styles.container} onClick={this.handleClick} style={style}>
        <div className={`${styles.progress} ${simple ? styles.simple : ''}`} style={{width: `${progress}%`}}/>
      </div>
    );
  }
}
