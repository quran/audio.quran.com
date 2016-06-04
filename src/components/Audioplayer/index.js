import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { load, play, pause, playPause, update } from 'redux/modules/audioplayer';
import formatSeconds from 'utils/formatSeconds';

import Track from './Track';

@connect(
  state => ({
    file: state.audioplayer.file,
    progress: state.audioplayer.progress,
    duration: state.audioplayer.duration,
    currentTime: state.audioplayer.currentTime,
    isPlaying: state.audioplayer.isPlaying,
    shouldRepeat: state.audioplayer.shouldRepeat,
  }),
  { load, play, pause, playPause, update }
)
export default class Audioplayer extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    playPause: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    file: PropTypes.object,
    url: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    shouldRepeat: PropTypes.bool.isRequired,
    progress: PropTypes.number,
    currentTime: PropTypes.number,
    duration: PropTypes.number
  };

  componentDidMount() {
    const { url, load } = this.props; // eslint-disable-line no-shadow

    load(url);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.file !== nextProps.file) {
      this.handleFileLoad(nextProps.file);
    }
  }

  handleTrackChange = (fraction) => {
    const { file, update } = this.props; // eslint-disable-line no-shadow

    update({
      progress: fraction * 100,
      currentTime: fraction * file.duration
    });

    file.currentTime = fraction * file.duration;
  }

  handleFileLoad(file) {
    const { update } = this.props; // eslint-disable-line no-shadow

    // Preload file
    file.setAttribute('preload', 'auto');

    const onLoadeddata = () => {
      // Default current time to zero. This will change
      file.currentTime = 0; // eslint-disable-line no-param-reassign

      update({
        duration: file.duration
      });
    };

    const onTimeupdate = () => {
      const progress = (
        file.currentTime /
        file.duration * 100
      );

      update({
        progress,
        currentTime: file.currentTime
      });
    };

    const onEnded = () => {
      const { shouldRepeat } = this.props;

      if (shouldRepeat) {
        file.pause();
        file.currentTime = 0; // eslint-disable-line no-param-reassign
        file.play();
      } else {
        if (file.readyState >= 3 && file.paused) {
          file.pause();
        }
        // onEnd();
      }
    };

    const onPlay = () => {};

    file.addEventListener('loadeddata', onLoadeddata);
    file.addEventListener('timeupdate', onTimeupdate, false);
    file.addEventListener('play', onPlay, false);
    file.addEventListener('ended', onEnded, false);
  }

  renderPlayStopButtons() {
    const { isPlaying, playPause } = this.props; // eslint-disable-line no-shadow

    let icon = <i className="fa fa-play" />;

    if (isPlaying) {
      icon = <i className="fa fa-pause" />;
    }

    return (
      <a className={`pointer`} onClick={playPause}>
        {icon}
      </a>
    );
  }

  renderPreviousButton() {
    return (
      <a className={`pointer`}>
        <i className="fa fa-skipback" />
      </a>
    );
  }

  renderNextButton() {
    return (
      <a className={`pointer`}>
        <i className="fa fa-skipforward" />
      </a>
    );
  }

  renderRepeatButton() {
    // const { shouldRepeat } = this.props;

    return (
      <Col xs={2} className="text-center pull-right">
        <input type="checkbox" id="repeat" />
        <label
          htmlFor="repeat"
          className={`pointer`}
          onClick={() => console.log('repeat!')}
        >
          <i className="fa fa-repeat" />
        </label>
      </Col>
    );
  }

  render() {
    const { file, progress } = this.props; // eslint-disable-line no-shadow

    return (
      <Row>
        <Col md={12}>
          <Row>
            <Col xs={2} className="text-center">
              {this.renderPreviousButton()}
            </Col>
            <Col xs={3} className="text-center">
              {this.renderPlayStopButtons()}
            </Col>
            <Col xs={2} className="text-center">
              {this.renderNextButton()}
            </Col>

            {this.renderRepeatButton()}
          </Row>
          {
            file && file.duration &&
            <span>{formatSeconds(file.currentTime)} / {formatSeconds(file.duration)}</span>
          }
          <Track
            progress={progress}
            onTrackChange={this.handleTrackChange}
          />
        </Col>
      </Row>
    );
  }
}
