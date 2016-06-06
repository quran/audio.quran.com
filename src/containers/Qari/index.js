import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { load } from 'redux/modules/audioplayer';
import zeroPad from 'utils/zeroPad';

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

    this.props.load(`http://download.quranicaudio.com/quran/${qari.relativePath}/${zeroPad(id, 3)}.mp3`);
  }

  render() {
    const { surahs } = this.props;

    return (
      <Grid>
        <Row>
          {
            Object.values(surahs).map(surah => (
              <Col md={12} key={surah.id} onClick={this.handleSurahSelection.bind(this, surah.id)}>
                {surah.id}. {surah.name.simple} <span className="pull-right"></span>
              </Col>
            ))
          }
        </Row>
      </Grid>
    );
  }
}
