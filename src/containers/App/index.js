import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import Audioplayer from 'components/Audioplayer';

import config from '../../config';

import { loadAll as loadQaris } from 'redux/modules/qaris';
import { loadAll as loadSections } from 'redux/modules/sections';
import { loadAll as loadSurahs } from 'redux/modules/surahs';

@asyncConnect([
  {
    promise({ store: { dispatch } }) {
      return dispatch(loadQaris());
    }
  },
  {
    promise({ store: { dispatch } }) {
      return dispatch(loadSections());
    }
  },
  {
    promise({ store: { dispatch } }) {
      return dispatch(loadSurahs());
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
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/">
                <div className={styles.brand}/>
                QuranicAudio
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
            <Nav navbar>
              <LinkContainer to="/about">
                <NavItem eventKey={4}>About Us</NavItem>
              </LinkContainer>
            </Nav>
            <Nav navbar pullRight>
              <NavItem eventKey={1} target="_blank" title="Quran.com" href="http://quran.com">
                Quran.com
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className={styles.appContent}>
          {this.props.children}
          <Audioplayer url="http://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/001.mp3" />
        </div>
      </div>
    );
  }
}
