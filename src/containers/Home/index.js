import React, { Component } from 'react';
// import Link from 'react-router/lib/Link';
import Helmet from 'react-helmet';

import Audioplayer from 'components/Audioplayer';

export default class Home extends Component {
  render() {
    const styles = require('./style.scss');

    return (
      <div className={styles.home} style={{paddingTop: 300}}>
        <Helmet title="Home"/>
        <Audioplayer url="http://download.quranicaudio.com/quran/abdullaah_3awwaad_al-juhaynee/076.mp3" />
      </div>
    );
  }
}
