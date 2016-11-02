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
  next,
  continuous,
  random
} from 'actions/audioplayer';

import formatSeconds from 'utils/formatSeconds';
import { cleanUpBrackets } from 'utils/cleanUp';

import Track from './Track';

const styles = require('./style.scss');

@connect(
  state => ({
    file: state.audioplayer.file,
    surahs: state.surahs.entities,
    qari: state.audioplayer.qari,
    surah: state.audioplayer.surah,
    progress: state.audioplayer.progress,
    duration: state.audioplayer.duration,
    currentTime: state.audioplayer.currentTime,
    isPlaying: state.audioplayer.isPlaying,
    shouldRepeat: state.audioplayer.shouldRepeat,
    shouldContinuous: state.audioplayer.shouldContinuous,
    shouldRandom: state.audioplayer.shouldRandom,
  }),
  { load, play, pause, playPause, update, repeat, next, previous, continuous, random }
)
export default class Audioplayer extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    surahs: PropTypes.object.isRequired,
    surah: PropTypes.shape({
      id: PropTypes.number.isRequired,
      ayat: PropTypes.number.isRequired,
      bismillahPre: PropTypes.bool.isRequired,
      name: PropTypes.object.isRequired,
      revelation: PropTypes.object.isRequired,
      page: PropTypes.array.isRequired
    }),
    playPause: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    repeat: PropTypes.func.isRequired,
    continuous: PropTypes.func.isRequired,
    random: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired,
    file: PropTypes.object,
    qari: PropTypes.object,
    isPlaying: PropTypes.bool.isRequired,
    shouldRepeat: PropTypes.bool.isRequired,
    shouldContinuous: PropTypes.bool.isRequired,
    shouldRandom: PropTypes.bool.isRequired,
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
      const { shouldRepeat, shouldContinuous, shouldRandom} = this.props;

      if (shouldRepeat) {
        file.pause();
        file.currentTime = 0; // eslint-disable-line no-param-reassign
        file.play();
      } else if (shouldContinuous) {
        const { surah, surahs, qari } = this.props; // eslint-disable-line no-shadow
        this.props.load({surah: Object.values(surahs)[surah.id], qari: qari});
      } else if (shouldRandom) {
        const {surahs, qari } = this.props; // eslint-disable-line no-shadow
        const randomSurah = Math.floor(Math.random() * (113 + 1));
        this.props.load({surah: Object.values(surahs)[randomSurah ], qari: qari});
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
      <div className={`text-center pull-right ${styles.toggle} ${shouldRepeat && styles.active}`}>
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

  renderRandomButton() {
    const { shouldRandom, random } = this.props; // eslint-disable-line no-shadow

    return (
      <div className={`text-center pull-right ${styles.toggle} ${shouldRandom && styles.active}`}>
        <input type="checkbox" id="random" className="hidden" />
        <label
          htmlFor="repeat"
          className={`pointer`}
          onClick={random}
        >
          <i className="fa fa-random" />
        </label>
      </div>
    );
  }

  render() {
    const { file, progress, qari, surah } = this.props; // eslint-disable-line no-shadow
    if (!surah) {
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
              <Col md={5} mdOffset={1} xs={12}>
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
                      {cleanUpBrackets(qari.name)}
                      <br />
                      <small className={styles.surahName}>
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
              <Col md={6} className={`text-center ${styles.info}`}>
                <ul className={`list-inline vertical-align`}>
                  <li>
                    {
                      file && !isNaN(file.duration) &&
                      <span>{formatSeconds(file.currentTime)} / {formatSeconds(file.duration)}</span>
                    }
                  </li>
                  <li>
                    {this.renderRandomButton()}
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
