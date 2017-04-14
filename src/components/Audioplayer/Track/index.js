import React, { Component, PropTypes } from 'react';

const styles = require('./style.scss');

export default class Track extends Component {
  static propTypes = {
    progress: PropTypes.number.isRequired,
    onTrackChange: PropTypes.func,
    simple: PropTypes.bool,
    style: PropTypes.object,
    progressStyle: PropTypes.object
  };

  handleClick = event => {
    const { onTrackChange } = this.props;

    const fraction =
      event.nativeEvent.offsetX /
      this.refs.container.getBoundingClientRect().width;

    return onTrackChange(fraction);
  };

  render() {
    const { progress, simple, style, progressStyle } = this.props;
    const progressStyleObject = Object.assign(
      {},
      { width: `${progress}%` },
      progressStyle
    );

    return (
      <div
        ref="container"
        className={`${styles.container} ${styles.activeHover}`}
        onClick={this.handleClick}
        style={style}
      >
        <div
          className={`${styles.progress} ${simple ? styles.simple : ''}`}
          style={progressStyleObject}
        />
      </div>
    );
  }
}
