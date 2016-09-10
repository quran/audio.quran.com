import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';

import { load, play, next, continuous} from 'redux/modules/audioplayer';
import { load as loadFiles } from 'redux/modules/files';
import zeroPad from 'utils/zeroPad';
import formatSeconds from 'utils/formatSeconds';
const styles = require('./style.scss');

@asyncConnect([{
  promise({ params, store: { dispatch } }) {
    return dispatch(loadFiles(params.id));
  }
}])
@connect(
  (state, ownProps) => ({
    surahs: state.surahs.entities,
    qari: state.qaris.entities[ownProps.params.id],
    files: state.files.entities[ownProps.params.id],
    Playing: state.audioplayer.isPlaying,
  }),
  { load, play, next, continuous}
)
export default class Qaris extends Component {
  static propTypes = {
    surahs: PropTypes.object.isRequired,
    qari: PropTypes.object.isRequired,
    files: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    continuous: PropTypes.func.isRequired,
    Playing: PropTypes.bool.isRequired
  };

  handlePlayAll() {
    const {surahs, files, Playing} = this.props;

    if (!Playing) {
      this.handleSurahSelection(Object.values(surahs).filter(() => files[1])[0]);
    }

    this.props.continuous();
  }

  handleSurahSelection = (surah) => {
    const { qari } = this.props;
    this.props.load({ qari, surah });
  }

  render() {
    const { surahs, qari, files } = this.props;

    return (
      <div>
        <Grid
          fluid
          className={`${styles.reciterBackground} ${qari.sectionId === 2 && styles.meccaBg}`}>
          <Row>
            <Col md={12} className="text-center">
              <h1 className={styles.reciterName}>
                {qari.name}
              </h1>

              <div className={styles.buttonContain}>
                <Button
                  bsStyle="primary"
                  className={styles.button}
                  onClick={this.handlePlayAll.bind(this)}
                  >
                  <i className={`fa fa-play ${styles.icon}`} /><span>Play All</span>
                </Button>

                <Button
                  bsStyle="primary"
                  className={styles.button}
                  onClick={(event) => event.stopPropagation()}
                  >
                  <span>Download All</span>
                </Button>
              </div>

            </Col>
          </Row>
        </Grid>
        <Grid className={styles.list}>
          <Row>
            <Col md={10} mdOffset={1}>
              <div className={`panel panel-default ${styles.panel}`}>
                <ul className="list-group">
                  {
                    Object.values(surahs).filter(surah => files[surah.id]).map(surah => (
                       <li
                        key={surah.id}
                        className={`list-group-item ${styles.row}`}
                        onClick={() => this.handleSurahSelection(surah)}
                      >
                        <Row>
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
                              className={styles.download}
                              href={`http://download.quranicaudio.com/quran/${qari.relativePath}${zeroPad(surah.id, 3)}.mp3`}
                              target="_blank"
                              onClick={(event) => event.stopPropagation()}
                              download>
                              <i className="fa fa-arrow-circle-down" /> Download
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
