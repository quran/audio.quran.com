import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import formatQarisByLetter from 'utils/formatQarisByLetter';
import QarisList from 'components/QarisList';
import Header from 'components/Header';
import Nav from 'components/Nav';

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
        <Header />
          <div className={`${styles.container}`}>
            <Nav section={section} sections={sections} handleSelect={this.handleSelect}/>
            <div md={12} className={styles.qariContainer}>
                {formated.map((item, index) => <QarisList key={index} data={item} section={section} />)}
            </div>
            <span className={styles.goTop} onClick={() => window.scrollTo(0, 0)}>Go to the top <i className="fa fa-chevron-up"></i></span>
          </div>
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
