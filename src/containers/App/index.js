import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
// import { IndexLink } from 'react-router';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';

// import Navbar from 'react-bootstrap/lib/Navbar';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';

import Link from 'react-router/lib/Link';

import Audioplayer from 'components/Audioplayer';

import config from '../../config';

import { loadAll as loadQaris } from 'redux/modules/qaris';
import { loadAll as loadSections } from 'redux/modules/sections';
import { loadAll as loadSurahs } from 'redux/modules/surahs';

@asyncConnect([
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
  },
])
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleLogout = (event) => {
    event.preventDefault();
  };

  render() {
    const styles = require('./style.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <div className={styles.linkContainer}>
          <Link to="/" className={styles.link}><span>Home</span></Link>
          <Link to="https://quran.com" className={`${styles.link} ${styles.linkRight}`}><span>Quran.com</span></Link>
        </div>
        <div className={styles.appContent}>
          {this.props.children}
          <div className={styles.audioplayer}>
            <Audioplayer />
          </div>
        </div>
      </div>
    );
  }
}
