import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import Sites from 'quran-components/lib/Sites';
import Icon from 'quran-components/lib/Icon';

import Link from 'react-router/lib/Link';
import Audioplayer from 'components/Audioplayer';
import AudioplayerMobile from 'components/Audioplayer/MobilePlayer';
import config from '../../config';
import { loadAll as loadQaris } from 'actions/qaris';
import { loadAll as loadSections } from 'actions/sections';
import { loadAll as loadSurahs } from 'actions/surahs';
import { isHome, isMobile } from '../../utils';
const styles = require('./style.scss');

class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    location: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  };

  state = {
    isMobile: isMobile()
  };

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({ isMobile: isMobile() });
    });
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        context: this.context
      })
    );

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <div className={styles.linkContainer}>
          {isHome(this.props.location.pathname) &&
            <Link
              to="/"
              title="Select from your favourite recriters"
              className={styles.link}
            >
              <i className="fa fa-home" aria-hidden="true" />
            </Link>}
          <Icon type="rows" />
          <div className={styles.sisterSites}>
            <Sites />
          </div>
        </div>
        <div className={styles.appContent}>
          {childrenWithProps}
          {this.state.isMobile ? <AudioplayerMobile /> : <Audioplayer />}
        </div>
      </div>
    );
  }
}

export default asyncConnect([
  {
    promise({ store: { getState, dispatch } }) {
      if (!Object.keys(getState().qaris.entities).length) {
        return dispatch(loadQaris());
      }
    }
  },
  {
    promise({ store: { getState, dispatch } }) {
      if (!Object.keys(getState().sections.entities).length) {
        return dispatch(loadSections());
      }
    }
  },
  {
    promise({ store: { getState, dispatch } }) {
      if (!Object.keys(getState().surahs.entities).length) {
        return dispatch(loadSurahs());
      }
    }
  }
])(App);
