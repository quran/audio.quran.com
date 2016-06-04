import React, { Component, PropTypes } from 'react';

const styles = require('./style.scss');

export default class Track extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    shouldRepeat: PropTypes.bool.isRequired,
    onPlay: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
    onEnd: PropTypes.func.isRequired
  };

  state = {
    progress: 0,
    currentTime: 0
  };

  componentDidMount() {
    const { file } = this.props;

    if (file) {
      this.onFileLoad(file);
    }
  }

  onFileLoad(file) {
    // Preload file
    file.setAttribute('preload', 'auto');

    const loadeddata = () => {
      // Default current time to zero. This will change
      file.currentTime = 0; // eslint-disable-line no-param-reassign

      // this.setState({isAudioLoaded: true});
    };

    const timeupdate = () => {
      const progress = (
        file.currentTime /
        file.duration * 100
      );

      this.setState({
        progress
      });
    };

    const ended = () => {
      const { shouldRepeat, onEnd } = this.props;

      if (shouldRepeat) {
        file.pause();
        file.currentTime = 0; // eslint-disable-line no-param-reassign
        file.play();
      } else {
        if (file.readyState >= 3 && file.paused) {
          file.pause();
        }
        onEnd();
      }
    };

    const play = () => {
      const { progress } = this.state;

      const currentTime = (
        progress / 100 * file.duration
      );

      this.setState({
        currentTime
      });
    };

    file.addEventListener('loadeddata', loadeddata);
    file.addEventListener('timeupdate', timeupdate, false);
    file.addEventListener('play', play, false);
    file.addEventListener('ended', ended, false);
  }

  render() {
    const { progress } = this.state;
    const { isPlaying, file } = this.props;

    if (isPlaying) {
      if (file.paused && file.readyState >= 3) {
        file.play(); // returns a promise, can do .then(() => {});
      }
    } else {
      if (!file.paused && file.readyState >= 3) {
        file.pause();
      }
    }

    return (
      <div className={styles.container}>
        <div className={styles.progress} style={{width: `${progress}%`}}/>
      </div>
    );
  }
}
