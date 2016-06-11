import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';

import { load } from 'redux/modules/audioplayer';
import zeroPad from 'utils/zeroPad';

const styles = require('./style.scss');

@connect(
  (state, ownProps) => ({
    surahs: state.surahs.entities,
    qari: state.qaris.entities[ownProps.params.id]
  }),
  { load }
)
export default class Qaris extends Component {
  static propTypes = {
    surahs: PropTypes.object.isRequired,
    qari: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired
  };

  handleSurahSelection = (id) => {
    const { qari } = this.props;

    this.props.load(`http://download.quranicaudio.com/quran/${qari.relativePath}${zeroPad(id, 3)}.mp3`);
  }

  render() {
    const { surahs, qari } = this.props;

    return (
      <div>
        <Grid fluid className={styles.reciterBackground}>
          <Row>
            <Col md={12} className="text-center">
              <h1>
                {qari.name}
              </h1>
            </Col>
          </Row>
        </Grid>
        <Grid className={styles.list}>
          <Row>
            <Col md={10} mdOffset={1}>
              <div className={`panel panel-default ${styles.panel}`}>
                <ul className="list-group">
                  {
                    Object.values(surahs).map(surah => (
                       <li className={`list-group-item ${styles.row}`} onClick={this.handleSurahSelection.bind(this, surah.id)}>
                        <Row>
                          <Col xs={1} className="text-center">
                            <span className={styles.muted}>
                              <span className="index">{surah.id}.</span>
                              <i className="fa fa-play-circle" />
                            </span>
                          </Col>
                          <Col xs={5}>
                            Surat {surah.name.simple} <span className="pull-right"></span>
                          </Col>
                          <Col xs={5} className="text-right">
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
                          <Col xs={1} className="text-right">
                            1:12min
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
