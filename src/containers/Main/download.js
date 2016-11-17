import React, { PropTypes, Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { load } from 'actions/download';
import zeroPad from 'utils/zeroPad';
const AUDIO_URL = 'http://download.quranicaudio.com/quran';

const styles = require('./style.scss');

class Download extends Component {
  static propTypes = {
    qaris: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    surahs: PropTypes.object.isRequired,
    download: PropTypes.object.isRequired
  }

  render() {
    const { surahs, download, qaris} = this.props;
    const { surahId, qariId } = download;
    const file = `${AUDIO_URL}/${qaris[qariId].relativePath}${zeroPad(surahId, 3)}.mp3`;
    return (
      <div>
        <Header />
        <Grid>
          <Row className={styles.aboutContainer}>
            <Col md={8} mdOffset={2}>
              <Row>
                <h1>Download </h1>
                <h2>Surat {surahs[surahId].name.simple} by {qaris[qariId].name}</h2>
                <a href={file}>Download</a>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const connectedDownload = connect(
  state => ({
    qaris: state.qaris.entities,
    surahs: state.surahs.entities,
    sections: state.sections.entities,
    download: state.download
  })
)(Download);


export default asyncConnect([{
  promise({ params, store: { dispatch } }) {
    return dispatch(load(params.id));
  }
}])(connectedDownload);
