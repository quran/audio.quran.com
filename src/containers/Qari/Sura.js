import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Helmet from 'react-helmet';
import { load, play, next} from 'actions/audioplayer';
import { load as loadFiles } from 'actions/files';
import Button from 'react-bootstrap/lib/Button';
import zeroPad from 'utils/zeroPad';
import Link from 'react-router/lib/Link';

const styles = require('./style.scss');

class Sura extends Component {

  static propTypes = {
    surahs: PropTypes.object.isRequired,
    surah: PropTypes.object.isRequired,
    currentQari: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    files: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    params: PropTypes.any,
    next: PropTypes.func.isRequired,
    Playing: PropTypes.bool.isRequired,
    qaris: PropTypes.object.isRequired
  };

  handleSurahSelection = (qari) => {
    const { surah, qaris} = this.props;

    this.props.load({ qari, surah, surahPage: true, qaris});
  }

  render() {
    const { surah, Playing, qaris, currentQari} = this.props;
    // console.log(this.props.currentQari);
    return (
      <div>
        <Helmet title={`Surah ${surah.name.simple}`} />
        <Grid
          fluid
          className={styles.reciterBackground}>
          <Row>
            <Col md={12} className="text-center">
              <h1>
                {`${surah.name.simple}`}
              </h1>
              <div className={styles.buttonContain}>
                <Button
                  bsStyle="primary"
                  target="_blank"
                  className={`${styles.button}`}
                  href={`https://quran.com/${surah.id}`}
                  >
                  <i className="fa fa-book" /> Read
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
                    Object.keys(qaris).map( (qariId) => {
                      const qari = qaris[qariId];
                      return (
                       <li
                        key={qari.id}
                        className={`list-group-item ${styles.row} ${qari.id === currentQari.id ? `${styles.active}` : ''}`}
                        onClick={() => this.handleSurahSelection(qari)}
                      >
                        <Row className={styles.surahRow}>
                          <Col md={8} xs={12}>
                            <Row>
                              <Col md={1} xs={2}>
                              <h5 className="text-muted">
                                <span className={styles.muted}>
                                  <span className="index">{qari.id}.</span>
                                  <i className="fa fa-play-circle fa-lg" />
                                </span>
                              </h5>
                              </Col>
                              <Col md={11} xs={10}>
                                <h5 className={`text-muted`}><Link className={styles.link} onClick={(event) => event.stopPropagation()} to={`/quran/${qari.id}`}>{qari.name}</Link></h5>
                              </Col>
                            </Row>
                          </Col>
                          <Col md={2} xs={2} className="text-right pull-right hidden-xs" >
                            <Button
                              bsStyle="primary"
                              className={styles.options}
                              href={`http://download.quranicaudio.com/quran/${qari.relativePath}${zeroPad(surah.id, 3)}.mp3`}
                              target="_blank"
                              onClick={(event) => event.stopPropagation()}
                              download>
                              <i className="fa fa-arrow-circle-down" /> Download
                            </Button>
                          </Col>
                        </Row>
                      </li>);
                    })
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

const connectedSura = connect(
  (state, ownProps) => ({
    surahs: state.surahs.entities,
    surah: state.surahs.entities[Number(ownProps.params.id)],
    qaris: state.qaris.entities,
    files: state.files.entities,
    Playing: state.audioplayer.isPlaying,
    state: state,
    currentQari: (state.audioplayer && state.audioplayer.qari) ? state.audioplayer.qari : {},
  }),
  { load, play, next}
)(Sura);

export default asyncConnect([{
  promise({ params, store: { dispatch } }) {
    return dispatch(loadFiles(Number(params.id)));
  }
}])(connectedSura);
