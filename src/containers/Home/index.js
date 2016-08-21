import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

const styles = require('./style.scss');
const images = Array(33).join(',').split(',').map((__, index) => require(`../../../static/images/background/compressed/${index + 1}.jpeg`));

@connect(
  state => ({
    qaris: state.qaris.entities,
    sections: state.sections.entities
  })
)

export default class Home extends Component {
  static propTypes = {
    qaris: PropTypes.object.isRequired,
    sections: PropTypes.object.isRequired
  };

  state = {
    section: 1
  }

  handleSelect = (section) => {
    this.setState({ section });
  }

  render() {
    const { sections, qaris } = this.props;
    const { section } = this.state;

    return (
      <div>
        <Grid className={styles.header} fluid>
          <Row>
            <Col md={8} mdOffset={2} className={`text-center ${styles.header__text}`}>
              <h3>Quranic Audio</h3>
              <h4 className={styles.description}>
                Welcome to QuranicAudio.com, your source for high quality recitations of the Quran.
                All the Quran recitations on this site are in high quality and are free for download and streaming as mp3s.
                Please enjoy your stay, contact us with your suggestions, tell your friends about the site, and don't forget us in your prayers!
              </h4>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col md={12} className={styles.pills}>
              <Nav bsStyle="pills" justified activeKey={section} onSelect={this.handleSelect} className="home-nav-pills">
                {
                  Object.values(sections).map(currentSection => (
                    <NavItem key={currentSection.id} eventKey={currentSection.id}>{currentSection.name}</NavItem>
                  ))
                }
              </Nav>
            </Col>
            <Col md={12}>
              <Row>
                {
                  Object.values(qaris).filter(qari => qari.sectionId === section).sort((prev, next) => next.name > prev.name ? -1 : 1).map(qari => (
                    <Col md={3} key={qari.id}>
                      <Link
                        className={styles.reciter}
                        to={`/quran/${qari.id}`}
                        style={{background: `url(${images[qari.id % images.length]}) center center no-repeat`, backgroundSize: 'cover'}}>
                        <div className={styles.overlay} />
                        <div className={styles.text}>{qari.name}</div>
                      </Link>
                    </Col>
                  ))
                }
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
