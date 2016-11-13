import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Helmet from 'react-helmet';
import { load, play, next, continuous} from 'actions/audioplayer';
import { load as loadFiles } from 'actions/files';
import zeroPad from 'utils/zeroPad';
import formatSeconds from 'utils/formatSeconds';
const styles = require('./style.scss');

class Qaris extends Component {
  static propTypes = {
    surahs: PropTypes.object.isRequired,
    qari: PropTypes.object.isRequired,
    files: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    currentSurah: PropTypes.any,
    next: PropTypes.func.isRequired,
    continuous: PropTypes.func.isRequired,
    shouldContinuous: PropTypes.bool,
    Playing: PropTypes.bool.isRequired
  };

  handleSurahSelection = (surah) => {
    const { qari, currentSurah } = this.props;
    const currenSurahId = currentSurah ? currentSurah.id : {};
    if (currenSurahId !== surah.id) {
      this.props.load({ qari, surah });
    }
  }

  render() {
    const { surahs, qari, files, currentSurah, Playing, shouldContinuous} = this.props;

    const handlePlayAll = () => {
      this.props.continuous();
      if (!shouldContinuous) {
        this.handleSurahSelection(Object.values(surahs).filter(() => files[1])[0]);
      }
    };

    const description = qari.description ? qari.description : '';
    return (
      <div>
        <Helmet title={`Holy Quran recritation by ${qari.name}`} />
        <Grid
          fluid
          className={styles.reciterBackground}>
          <Row>
            <Col md={12} className="text-center">
              <h1 className={styles.reciterName}>
                {qari.name}
              </h1>
              <p className={styles.description} dangerouslySetInnerHTML={{__html: description.replace(/\\/g, '')}} />
              <div className={styles.buttonContain}>
                <Button
                  bsStyle="primary"
                  className={`${styles.button} ${shouldContinuous ? styles.playAllActive : ''}`}
                  onClick={handlePlayAll}
                  >
                  <i className={`fa fa-play ${styles.icon}`} /><span>Play All</span>
                </Button>
              </div>
            </Col>
          </Row>
        </Grid>
        <Grid className={styles.list}>
          <Row>
            <Col md={10} mdOffset={1}>
              <div className={`panel panel-default ${styles.panel} ${Playing ? styles.panelPlaying : ''}`}>
                <ul className="list-group">
                  {
                    Object.values(surahs).filter(surah => files[surah.id]).map(surah => (
                       <li
                        key={surah.id}
                        className={`list-group-item ${styles.row} ${surah.id === currentSurah.id ? `${styles.active}` : ''}`}
                        onClick={() => this.handleSurahSelection(surah)}
                      >
                        <Row className={styles.surahRow}>
                          <Col md={6} xs={8}>
                            <Row>
                              <Col md={1} xs={2}>
                              <h5 className="text-muted">
                                <span className={styles.muted}>
                                  <span className="index">{surah.id}.</span>
                                  <i className="fa fa-play-circle fa-lg" />
                                </span>
                              </h5>
                              </Col>
                              <Col md={11} xs={10}>
                                <h5 className="text-muted">
                                  Surat {surah.name.simple}
                                </h5>
                              </Col>
                            </Row>
                          </Col>
                          <Col md={5} className="text-right hidden-xs hidden-sm">
                            <Button
                              bsStyle="primary"
                              className={styles.options}
                              href={`http://download.quranicaudio.com/quran/${qari.relativePath}${zeroPad(surah.id, 3)}.mp3`}
                              target="_blank"
                              onClick={(event) => event.stopPropagation()}
                              download>
                              <i className="fa fa-arrow-circle-down" /> Download
                            </Button>
                             <Button
                              bsStyle="primary"
                              className={styles.options}
                              href={`https://www.quran.com/${surah.id}`}
                              target="_blank"
                              onClick={(event) => event.stopPropagation()}>
                              <i className="fa fa-book" /> Read
                            </Button>
                          </Col>
                          <Col md={1} xs={4} className="text-right">
                            <h5 className={`text-muted ${styles.muted}`}>
                              {formatSeconds(files[surah.id].format.duration)}
                            </h5>
                          </Col>
                        </Row>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const connectedQaris = connect(
  (state, ownProps) => ({
    surahs: state.surahs.entities,
    qari: state.qaris.entities[ownProps.params.id],
    files: state.files.entities[ownProps.params.id],
    Playing: state.audioplayer.isPlaying,
    shouldContinuous: state.audioplayer.shouldContinuous,
    currentSurah: (state.audioplayer && state.audioplayer.surah) ? state.audioplayer.surah : {},
  }),
  { load, play, next, continuous}
)(Qaris);

export default asyncConnect([{
  promise({ params, store: { dispatch } }) {
    return dispatch(loadFiles(params.id));
  }
}])(connectedQaris);
