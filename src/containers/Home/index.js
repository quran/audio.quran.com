import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import formatQarisByLetter from '../../utils/formatQarisByLetter';
import Qaris from '../../components/Qaris';
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
    const formated = formatQarisByLetter(qaris);

    return (
      <div>
        <Grid className={styles.header} fluid>
          <Row>
            <Col md={8} mdOffset={2} className={`text-center ${styles.header__text}`}>
              <h1 className={styles.heading}>QuranicAudio</h1>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className={styles.container}>
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
                {formated.map((item, index) => <Qaris key={index} qaris={item} />)}
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
