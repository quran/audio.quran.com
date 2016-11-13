import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import formatQarisByLetter from '../../utils/formatQarisByLetter';
import QarisList from '../../components/QarisList';

const styles = require('./style.scss');

class Home extends Component {

  static propTypes = {
    qaris: PropTypes.object.isRequired,
    sections: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    location: PropTypes.object,
    params: PropTypes.object

  };

  contextTypes: {
    router: React.PropTypes.func.isRequired
  }

  state = {
    section: Number(this.props.params.section) || 1
  }

  componentWillReceiveProps(nextProps) {
    const routeChanged = nextProps.location !== this.props.location;
    if (routeChanged) {
      const section = Number(nextProps.params.section) || 1;
      this.setState({ section });
    }
  }

  handleSelect = (section) => {
    const url = section !== 1 ? `/section/${section}` : '/';
    this.props.context.router.push(url);
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
                    <NavItem className={styles.pillsItem} key={currentSection.id} eventKey={currentSection.id}>{currentSection.name}</NavItem>
                  ))
                }
              </Nav>
            </Col>
            <Col md={12}>
              <Row>
                {formated.map((item, index) => <QarisList key={index} data={item} section={section} />)}
              </Row>
            </Col>
            <span className={styles.goTop} onClick={() => window.scrollTo(0, 0)}>Go to the top <i className="fa fa-chevron-up"></i></span>
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
