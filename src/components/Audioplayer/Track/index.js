import React, { Component, PropTypes } from 'react';

const styles = require('./style.scss');

export default class Track extends Component {
  static propTypes = {
    progress: PropTypes.number.isRequired,
    onTrackChange: PropTypes.func,
    simple: PropTypes.bool,
    showExpanded: PropTypes.bool,
    style: PropTypes.object,
    progressStyle: PropTypes.object
  };

  handleClick = (event) => {
    const { onTrackChange } = this.props;

    const fraction = (
      event.nativeEvent.offsetX /
      this.refs.container.getBoundingClientRect().width
    );

    return onTrackChange(fraction);
  }

  render() {
    const { progress, simple, style, progressStyle, showExpanded} = this.props;
    const progressStyleObject = Object.assign({}, { width: `${progress}%` }, progressStyle);


    const handleMouse = (event) => {
      if (!showExpanded) {
        const elClassList = event.target.closest(`.${styles.container}`).classList;
        if ( event.type === 'mouseenter') {
          elClassList.add(styles.activeHover);
        }
        elClassList.remove(styles.activeHover);
      }
    };

    return (
      <div ref="container" className={`${styles.container} ${showExpanded ? styles.activeHover : ''}`}
        onMouseEnter={handleMouse}
        onMouseLeave={handleMouse}
        onClick={this.handleClick} style={style}>
        <div className={`${styles.progress} ${simple ? styles.simple : ''}`} style={progressStyleObject} />
      </div>
    );
  }
}
