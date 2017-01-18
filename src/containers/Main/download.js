import React, { PropTypes, Component } from 'react';
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
          <div className={styles.page}>
              {data.loaded ? <div>
                <h1>Surat {surahs[surahId].name.simple} by {qaris[qariId].name}</h1>
                <a className={styles.downloadLink} href={`http://download.quranicaudio.com/quran/${qaris[qariId].relativePath}${zeroPad(surahId, 3)}.mp3`}>Download</a>
              </div> : <h1>Not Found</h1>}
          </div>
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
