import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

import Button from 'quran-components/lib/Button';

import Helmet from 'react-helmet';
import { load, play, next, random } from 'actions/audioplayer';
import { load as loadRelated } from 'actions/related';
import { load as loadFiles } from 'actions/files';
import Related from 'components/Related';
import SurahList from 'components/SurahList';
const styles = require('./style.scss');

class Qaris extends Component {
  static propTypes = {
    surahs: PropTypes.object.isRequired,
    qaris: PropTypes.any.isRequired,
    qari: PropTypes.object.isRequired,
    files: PropTypes.object.isRequired,
    currentTime: PropTypes.any,
    progress: PropTypes.number,
    related: PropTypes.array.isRequired,
    load: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    currentSurah: PropTypes.any,
    currentQari: PropTypes.any,
    next: PropTypes.func.isRequired,
    random: PropTypes.func.isRequired,
    shouldRandom: PropTypes.bool,
    isPlaying: PropTypes.bool.isRequired
  };
  state = { toggleRelated: false };
  handleSurahSelection = (surah) => {
    const { qari, currentSurah, currentQari } = this.props;
    const currenSurahId = currentSurah ? currentSurah.id : {};
    if (currenSurahId !== surah.id || currentQari.id !== qari.id) {
      this.props.load({ qari, surah });
    }
  }
  handleRelated = () => {
    this.setState({
      toggleRelated: !this.state.toggleRelated
    });
  }
  render() {
    const { surahs, qari, files, currentSurah, shouldRandom, related, qaris } = this.props;
    const { toggleRelated } = this.state;

    const handleShuffleAll = () => {
      this.props.random();
      if (!shouldRandom) {
        const randomSurah = Math.floor(Math.random() * (113 + 1));
        const surahId = (currentSurah && currentSurah.id) ? currentSurah.id + 1 : randomSurah;
        this.handleSurahSelection(Object.values(surahs).filter(() => files[1])[surahId]);
      }
    };

    const description = qari.description ? qari.description : '';

    return (
      <div>
        <Helmet title={`Holy Quran recritation by ${qari.name}`} />
        <div className={styles.reciterBackground}>
          <div className="text-center">
            <h1 className={styles.reciterName}>
              {qari.name}
            </h1>
            <p className={styles.description} dangerouslySetInnerHTML={{ __html: description.replace(/\\/g, '') }} />
            <div className={styles.buttonContain}>
              <Button
                color={ shouldRandom ? 'inverted' : ''}
                className={styles.button}
                onClick={handleShuffleAll}
              >
                <i className={`fa ${shouldRandom ? 'fa-stop' : 'fa-play'} ${styles.icon}`} /><span>Shuffle Play</span>
              </Button>
              {related.length > 0 && (
                <Button
                  color={ toggleRelated ? 'inverted' : ''}
                  className={`${styles.button} ${styles.related}`}
                  onClick={this.handleRelated}
                >
                  <i className={`fa fa-sitemap ${styles.icon}`} /><span>{'Other Recitations'}</span>
                </Button>)}
              <Related related={related} qaris={qaris} toggle={toggleRelated} />
            </div>
          </div>
        </div>
        <SurahList {...this.props} handleSurahSelection={this.handleSurahSelection} />
      </div>
    );
  }
}

const connectedQaris = connect(
  (state, ownProps) => ({
    related: state.related.qaris,
    surahs: state.surahs.entities,
    qaris: state.qaris.entities,
    qari: state.qaris.entities[ownProps.params.id],
    files: state.files.entities[ownProps.params.id],
    isPlaying: state.audioplayer.isPlaying,
    currentTime: state.audioplayer.currentTime,
    shouldRandom: state.audioplayer.shouldRandom,
    progress: state.audioplayer.progress,
    currentSurah: (state.audioplayer && state.audioplayer.surah) ? state.audioplayer.surah : {},
    currentQari: state.audioplayer.qari
  }),
  { load, play, next, random }
)(Qaris);

export default asyncConnect([{
  promise({ params, store: { dispatch } }) {
    return dispatch(loadFiles(params.id));
  }
},
{
  promise({ params, store: { dispatch } }) {
    return dispatch(loadRelated(params.id));
  }
}])(connectedQaris);
