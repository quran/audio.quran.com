import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import style from './mobile.scss';
import Track from './Track';
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

class MobilePlayer extends Component {
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
  state = {
    open: false
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.surah !== nextProps.surah || this.props.qari !== nextProps.qari) {
      this.handleFileLoad(nextProps.file);
      this.handleRemoveFileListeneres(this.props.file);
    }
  }

  handleRemoveFileListeneres(file) {
    if (file) {
      file.pause();
      file.onloadeddata = null;
      file.ontimeupdate = null;
      file.onplay = null;
      file.onended = null;
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
        currentTime: file.currentTime,
        isPlaying: !file.paused
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
          surah: null,
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
    if (file.readyState < 4) {
      return (<i className={`text-primary pointer loading is-loading ${style.isLoading}`}></i>);
    }

    if (isPlaying && file.readyState >= 4) {
      return <i onClick={playPause} className={`text-primary pointer fa fa-pause-circle ${!file && style.disabled} ${style.playPause}`} />;
    }

    return <i onClick={playPause} className={`text-primary pointer fa fa-play-circle${!file && style.disabled} ${style.playPause}`} />;
  }

  renderPreviousButton() {
    const { previous, surah, surahs, qaris, surahPage, qari } = this.props; // eslint-disable-line no-shadow
    const disableBasedOnSurah = surah ? surah.id === 114 && true : true;
    const disabled = surahPage ? qari.id === Object.keys(qaris).length : disableBasedOnSurah;

    return (
      <i
        onClick={() => !disabled && previous({ surahs: Object.values(surahs) })}
        className={`pointer fa fa-fast-backward fa-lg ${disabled && style.disabled} ${style.previous}`}
        />
    );
  }
  renderNextButton() {
    const { next, surah, surahs, surahPage, qari } = this.props; // eslint-disable-line no-shadow
    const disableBasedOnSurah = surah ? surah.id === 1 && true : true;
    const disabled = surahPage ? qari.id === 1 && true : disableBasedOnSurah;

    return (
      <i
        onClick={() => !disabled && next({ surahs: Object.values(surahs) })}
         className={`pointer fa fa-fast-forward fa-lg ${disabled && style.disabled} ${style.next}`}
        />
    );
  }

  renderRepeatButton() {
    const { shouldRepeat, repeat } = this.props; // eslint-disable-line no-shadow

    return (
      <div className={`${style.toggle} ${shouldRepeat && style.active}`}>
        <input type="checkbox" id="repeat" className="hidden" />
        <label
          htmlFor="repeat"
          className={`pointer`}
          onClick={repeat}
          >
          <i className={`fa fa-repeat ${style.repeat}`} />
        </label>
      </div>
    );
  }
  renderRandomButton() {
    const { shouldRandom, random } = this.props; // eslint-disable-line no-shadow

    return (
      <div className={`${style.toggle} ${shouldRandom && style.active}`}>
        <input type="checkbox" id="random" className="hidden" />
        <label
          htmlFor="repeat"
          className={`pointer`}
          onClick={random}
        >
          <i className={`fa fa-random ${style.random}`} />
        </label>
      </div>
    );
  }

  render() {
    const { qari, surah, progress, file } = this.props; // eslint-disable-line no-shadow, react/prop-types
    const isOpen = this.state.open ? style.active : false;
    const validFileTiming = file && !isNaN(file.duration);
    if (!surah) return false;
    return (
          <div className={`${style.audioplayer} ${isOpen}`}>
              <i onClick={() => this.setState({open: !this.state.open})} className={`fa fa-chevron-up ${style.chevron}`} aria-hidden="true"></i>
              <h2 className={style.qariName}>{qari && qari.name}</h2>
              <h3 className={style.surahName}>{`Surat ${surah.name.simple}`}</h3>
              <div className={style.surahMisc}>
                <p> سورة {surah.name.arabic}</p>
              </div>
              <div className={style.controls}>
                <ul className={style.timeline}>
                    <li className={style.timelineItem}>{validFileTiming ? formatSeconds(file.currentTime) : '00:00'}</li>
                      <li className={style.track}><Track simple={false} progress={validFileTiming ? progress : 0} onTrackChange={this.handleTrackChange} style={{background: '#5b5b5b'}} /></li>
                      <li className={style.timelineItem}>{validFileTiming ? formatSeconds(file.duration) : '00:00'}</li>
                </ul>
                <div className={style.controlActions}>
                    {this.renderRandomButton()}
                    {this.renderPreviousButton()}
                    {this.renderPlayStopButtons()}
                    {this.renderNextButton()}
                    {this.renderRepeatButton()}
                </div>
              </div>
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
    shouldRandom: state.audioplayer.shouldRandom,
  }),
  { load, play, pause, playPause, update, repeat, next, previous, continuous, random }
)(MobilePlayer);
