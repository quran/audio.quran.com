import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';

import Link from 'react-router/lib/Link';
import Audioplayer from 'components/Audioplayer';
import Nav from 'components/Nav';
import config from '../../config';
import { loadAll as loadQaris } from 'actions/qaris';
import { loadAll as loadSections } from 'actions/sections';
import { loadAll as loadSurahs } from 'actions/surahs';
import {isHome } from '../../utils';
const styles = require('./style.scss');

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Nav />
        <div className={styles.linkContainer}>
          <Link to="/" title="Select from your favourite recriters" className={styles.link}>{isHome(this.props.location.pathname) ? <i className="fa fa-home" aria-hidden="true"></i> : <i></i>}</Link>
          <a href="https://quran.com" title="Read the holy Quran, on quran.com" className={`${styles.link} ${styles.linkRight}`}><i className="fa fa-book" aria-hidden="true"></i></a>
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
  },
])(App);
