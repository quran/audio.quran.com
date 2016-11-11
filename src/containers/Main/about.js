import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Link from 'react-router/lib/Link';

const styles = require('./style.scss');

class Home extends Component {
  render() {
    return (
      <div>
        <Grid className={styles.header} fluid>
          <Row>
            <Col md={8} mdOffset={2} className={`text-center ${styles.header__text}`}>
              <h1 className={styles.heading}><Link to="/" className={styles.heading__link}>QuranicAudio</Link></h1>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className={styles.aboutContainer}>
            <Col md={8} mdOffset={2}>
              <Row>
                <h1>About</h1>
                <p>
                QuranicAudio.com is the largest collection of cd quality Quran recitations on the internet. Mp3s on this site may be downloaded and used for personal use free of charge. However, you may not use these files for commercial purposes as many of these files have rules and regulations that prevent their sale except by the publishing companies.
                </p>
                <p>
                QuranicAudio.com is the largest collection of cd quality Quran recitations on the internet. Mp3s on this site may be downloaded and used for personal use free of charge. However, you may not use these files for commercial purposes as many of these files have rules and regulations that prevent their sale except by the publishing companies.
                </p>
                <p>
                Files on QuranicAudio.com come from many different sources. Many of them are hand ripped from cds. Others have been downloaded from various other high quality sites on the internet, including HidayahOnline, DawahAcademy, <a href="http://kalamullah.com">Kalamullah.com</a>, <a href="http://sabbir.com">Sabbir.com</a>, <a href="http://dhikrullah.com">dhikrullah.com</a>, <a href="http://zanjabil.net">zanjabil.net</a>, <a href="http://shuraym.com">shuraym.com</a>, and others. Many of the files have also been sent to us by some of our users, may Allah reward them greatly.
                </p>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({
    qaris: state.qaris.entities,
    sections: state.sections.entities
  })
)(Home);
