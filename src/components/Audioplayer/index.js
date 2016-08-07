import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import {
  load,
  play,
  pause,
  playPause,
  update,
  repeat,
  previous,
  next
} from 'redux/modules/audioplayer';

import formatSeconds from 'utils/formatSeconds';

import Track from './Track';

const styles = require('./style.scss');

@connect(
  state => ({
    file: state.audioplayer.file,
    qari: state.audioplayer.qari,
    surah: state.audioplayer.surah,
    progress: state.audioplayer.progress,
    duration: state.audioplayer.duration,
    currentTime: state.audioplayer.currentTime,
    isPlaying: state.audioplayer.isPlaying,
    shouldRepeat: state.audioplayer.shouldRepeat,
  }),
  { load, play, pause, playPause, update, repeat, next, previous }
)
export default class Audioplayer extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    playPause: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    repeat: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired,
    file: PropTypes.object,
    qari: PropTypes.object,
    surah: PropTypes.object,
    isPlaying: PropTypes.bool.isRequired,
    shouldRepeat: PropTypes.bool.isRequired,
    progress: PropTypes.number,
    currentTime: PropTypes.number,
    duration: PropTypes.number
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.file !== nextProps.file) {
      this.handleFileLoad(nextProps.file);

      if (this.props.file) {
        this.handleRemoveFileListeneres(this.props.file);
      }
    }
  }

  handleRemoveFileListeneres(file) {
    file.pause();
    file.onloadeddata = null;
    file.ontimeupdate = null;
    file.onplay = null;
    file.onended = null;
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

        update({
          isPlaying: false
        });
      }
    };

    const onPlay = () => {};

    file.onloadeddata = onLoadeddata;
    file.ontimeupdate = onTimeupdate;
    file.onplay = onPlay;
    file.onended = onEnded;
  }

  renderPlayStopButtons() {
    const { isPlaying, playPause, file } = this.props; // eslint-disable-line no-shadow

    if (isPlaying) {
      return <i onClick={playPause} className={`text-primary pointer fa fa-pause-circle fa-3x ${!file && styles.disabled}`} />;
    }

    return <i onClick={playPause} className={`text-primary pointer fa fa-play-circle fa-3x ${!file && styles.disabled}`} />;
  }

  renderPreviousButton() {
    const { previous, surah } = this.props; // eslint-disable-line no-shadow
    const disabled = surah ? surah.id === 1 && true : true;

    return (
      <i
        onClick={() => !disabled && previous()}
        className={`pointer fa fa-fast-backward fa-lg ${disabled && styles.disabled}`}
      />
    );
  }

  renderNextButton() {
    const { next, surah } = this.props; // eslint-disable-line no-shadow
    const disabled = surah ? surah.id === 114 && true : true;

    return (
      <i
        onClick={() => !disabled && next()}
        className={`pointer fa fa-fast-forward fa-lg ${disabled && styles.disabled}`}
      />
    );
  }

  renderRepeatButton() {
    const { shouldRepeat, repeat } = this.props; // eslint-disable-line no-shadow

    return (
      <div className={`text-center pull-right ${styles.repeat} ${shouldRepeat && styles.active}`}>
        <input type="checkbox" id="repeat" className="hidden" />
        <label
          htmlFor="repeat"
          className={`pointer`}
          onClick={repeat}
        >
          <i className="fa fa-repeat" />
        </label>
      </div>
    );
  }

  render() {
    const { file, progress, qari, surah } = this.props; // eslint-disable-line no-shadow

    if (!qari || !surah) {
      return <noscript />;
    }

    return (
      <Row>
        <Col md={12}>
          <Track
            progress={progress}
            onTrackChange={this.handleTrackChange}
          />
          <Grid fluid>
            <Row>
              <Col md={5} mdOffset={1} xs={3}>
                <ul className={`list-inline vertical-align ${styles.controls}`}>
                  <li>
                    {this.renderPreviousButton()}
                  </li>
                  <li>
                    {this.renderPlayStopButtons()}
                  </li>
                  <li>
                    {this.renderNextButton()}
                  </li>
                  <li className={`text-left ${styles.name}`}>
                  {
                    qari && surah ?
                    <h4>
                      {qari.name}
                      <br />
                      <small>
                        {surah.name.simple} ({surah.name.english})
                      </small>
                    </h4> :
                    <h4>
                      --
                      <br />
                      <small>
                        --
                      </small>
                    </h4>
                  }
                  </li>
                </ul>
              </Col>
              <Col md={6} className={`text-center ${styles.rightNav}`}>
                <ul className={`list-inline vertical-align ${styles.controls}`}>
                  <li>
                    {
                      file && !isNaN(file.duration) &&
                      <span>{formatSeconds(file.currentTime)} / {formatSeconds(file.duration)}</span>
                    }
                  </li>
                  <li>
                    {this.renderRepeatButton()}
                  </li>
                </ul>
              </Col>
            </Row>
          </Grid>
        </Col>
      </Row>
    );
  }
}
