import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

const styles = require('./style.scss');

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
            <Col md={8} mdOffset={2} className="text-center">
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
            <Col md={12}>
              <Nav bsStyle="pills" justified activeKey={section} onSelect={this.handleSelect}>
                {
                  Object.values(sections).map(currentSection => (
                    <NavItem key={currentSection.id} eventKey={currentSection.id}>{currentSection.name}</NavItem>
                  ))
                }
              </Nav>
              <Row>
                {
                  Object.values(qaris).filter(qari => qari.sectionId === section).map(qari => (
                    <Col md={4} key={qari.id}>
                      <Link to={`/quran/${qari.id}`}>
                        {qari.name}
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
