import React, { Component } from 'react';
// import Link from 'react-router/lib/Link';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    const styles = require('./style.scss');

    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        Home
      </div>
    );
  }
}
