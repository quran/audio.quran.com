import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { load, play, pause, playPause } from 'redux/modules/audioplayer';

import Track from './Track';

@connect(
  state => ({
    file: state.audioplayer.file,
    // isSupported: state.audioplayer.isSupported,
    isPlaying: state.audioplayer.isPlaying,
    shouldRepeat: state.audioplayer.shouldRepeat,
    // currentSurah: state.audioplayer.currentSurah
  }),
  { load, play, pause, playPause }
)
export default class Audioplayer extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    playPause: PropTypes.func.isRequired,
    file: PropTypes.object,
    url: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    shouldRepeat: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { url, load } = this.props; // eslint-disable-line no-shadow

    load(url);
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
    const { file, isPlaying, shouldRepeat } = this.props;

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
            file &&
            <Track
              file={file}
              isPlaying={isPlaying}
              shouldRepeat={shouldRepeat}
              onPlay={play}
              onPause={pause}
              onEnd={() => console.log('END!')}
            />
          }
        </Col>
      </Row>
    );
  }
}
