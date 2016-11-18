import React, { PropTypes, Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { load } from 'actions/download';
import zeroPad from 'utils/zeroPad';

const styles = require('./style.scss');

class Download extends Component {

  static propTypes = {
    qaris: PropTypes.object.isRequired,
    surahs: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
  }

  render() {
    const { surahs, data, qaris} = this.props;
    const { surahId, qariId } = data;
    return (
      <div>
        <Header />
        <Grid>
          <Row className={styles.aboutContainer}>
            <Col md={8} mdOffset={2}>
              {data.loaded ? <Row>
                <h1>Surat {surahs[surahId].name.simple} by {qaris[qariId].name}</h1>
                <a className={styles.downloadLink} href={`http://download.quranicaudio.com/quran/${qaris[qariId].relativePath}${zeroPad(surahId, 3)}.mp3`}>Download</a>
              </Row> : <h1>Not Found</h1>}
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
    data: state.download
  })
)(Download);


export default asyncConnect([{
  promise({ params, store: { dispatch } }) {
    return dispatch(load(params.id));
  }
}])(connectedDownload);
