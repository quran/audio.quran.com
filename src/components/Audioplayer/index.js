import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Common from './CommonAudio';
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

class Audioplayer extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    surahs: PropTypes.object.isRequired,
    qaris: PropTypes.object,
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
    surahPage: PropTypes.bool,
    progress: PropTypes.number,
    currentTime: PropTypes.number,
    duration: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.handleTrackChange = Common.handleTrackChange.bind(this);
    this.handleFileLoad = Common.handleFileLoad.bind(this);
    this.handleRemoveFileListeneres = Common.handleRemoveFileListeneres.bind(
      this
    );
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.surah !== nextProps.surah || this.props.qari !== nextProps.qari
    ) {
      this.handleFileLoad(nextProps.file);
      this.handleRemoveFileListeneres(this.props.file);
    }
  }

  renderPlayStopButtons() {
    const { isPlaying, playPause, file } = this.props; // eslint-disable-line no-shadow
    if (file.readyState < 4) {
      return <i className=" text-primary loading is-loading" />;
    }

    if (isPlaying && file.readyState >= 4) {
      return (
        <i
          onClick={playPause}
          className={`text-primary pointer fa fa-pause-circle fa-3x ${!file && styles.disabled}`}
        />
      );
    }

    return (
      <i
        onClick={playPause}
        className={`text-primary pointer fa fa-play-circle fa-3x ${!file && styles.disabled}`}
      />
    );
  }

  renderPreviousButton() {
    const { previous, surah, surahs, surahPage, qari } = this.props; // eslint-disable-line no-shadow
    const disableBasedOnSurah = surah ? surah.id === 1 && true : true;
    const disabled = surahPage ? qari.id === 1 && true : disableBasedOnSurah;

    return (
      <i
        onClick={() => !disabled && previous({ surahs: Object.values(surahs) })}
        className={`pointer fa fa-fast-backward fa-lg ${disabled && styles.disabled}`}
      />
    );
  }

  renderNextButton() {
    const { next, surah, surahs, qaris, surahPage, qari } = this.props; // eslint-disable-line no-shadow
    const disableBasedOnSurah = surah ? surah.id === 114 && true : true;
    const disabled = surahPage
      ? qari.id === Object.keys(qaris).length
      : disableBasedOnSurah;

    return (
      <i
        onClick={() => !disabled && next({ surahs: Object.values(surahs) })}
        className={`pointer fa fa-fast-forward fa-lg ${disabled && styles.disabled}`}
      />
    );
  }

  renderRepeatButton() {
    const { shouldRepeat, repeat } = this.props; // eslint-disable-line no-shadow

    return (
      <div
        className={`text-center pull-right ${styles.toggle} ${shouldRepeat && styles.active}`}
      >
        <input type="checkbox" id="repeat" className="hidden" />
        <label htmlFor="repeat" className={`pointer`} onClick={repeat}>
          <i className="fa fa-repeat" />
        </label>
      </div>
    );
  }

  renderRandomButton() {
    const { shouldRandom, random } = this.props; // eslint-disable-line no-shadow

    return (
      <div
        className={`text-center pull-right ${styles.toggle} ${shouldRandom && styles.active}`}
      >
        <input type="checkbox" id="random" className="hidden" />
        <label htmlFor="repeat" className={`pointer`} onClick={random}>
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
      <div className={styles.audioplayer}>
        <Row>
          <Col md={12}>
            <Track progress={progress} onTrackChange={this.handleTrackChange} />
            <Grid fluid>
              <Row>
                <Col md={5} mdOffset={1} xs={12}>
                  <ul
                    className={`list-inline vertical-align ${styles.controls}`}
                  >
                    {[
                      this.renderPreviousButton(),
                      this.renderPlayStopButtons(),
                      this.renderNextButton()
                    ].map((item, index) => (
                      <li className={styles.controlsItem} key={index}>
                        {item}
                      </li>
                    ))}
                    <li className={`text-left ${styles.name}`}>
                      {qari && surah
                        ? <h4>
                            {cleanUpBrackets(qari.name)}
                            <br />
                            <small className={styles.surahName}>
                              {surah.name.simple} ({surah.name.english})
                            </small>
                          </h4>
                        : <h4>
                            --
                            <br />
                            <small>
                              --
                            </small>
                          </h4>}
                    </li>
                  </ul>
                </Col>
                <Col md={6} className={`text-center ${styles.infoContainer}`}>
                  <ul className={`list-inline vertical-align ${styles.info}`}>
                    <li>
                      {!isNaN(file.duration)
                        ? <span>
                            {formatSeconds(file.currentTime)}
                            {' '}
                            /
                            {' '}
                            {formatSeconds(file.duration)}
                          </span>
                        : ''}
                    </li>
                    <li>{this.renderRandomButton()}</li>
                    <li>{this.renderRepeatButton()}</li>
                  </ul>
                  <p className={styles.surahNameEnglish}>
                    {surah.name.simple} ({surah.name.english})
                  </p>
                </Col>
              </Row>
            </Grid>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  state => ({
    file: state.audioplayer.file,
    surahs: state.surahs.entities,
    qari: state.audioplayer.qari,
    qaris: state.audioplayer.qaris,
    surah: state.audioplayer.surah,
    progress: state.audioplayer.progress,
    duration: state.audioplayer.duration,
    currentTime: state.audioplayer.currentTime,
    isPlaying: state.audioplayer.isPlaying,
    shouldRepeat: state.audioplayer.shouldRepeat,
    surahPage: state.audioplayer.surahPage,
    shouldContinuous: state.audioplayer.shouldContinuous,
    shouldRandom: state.audioplayer.shouldRandom
  }),
  {
    load,
    play,
    pause,
    playPause,
    update,
    repeat,
    next,
    previous,
    continuous,
    random
  }
)(Audioplayer);
