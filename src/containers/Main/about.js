import React from 'react';
import Header from '../../components/Header';

const styles = require('./style.scss');

export default () => {
  return (
    <div>
      <Header />
      <div className={styles.page}>
        <h1>About</h1>
        <p>
          QuranicAudio.com is the largest collection of cd quality Quran recitations on the internet. Mp3s on this site may be downloaded and used for personal use free of charge. However, you may not use these files for commercial purposes as many of these files have rules and regulations that prevent their sale except by the publishing companies.
        </p>
        <p>
          Files on QuranicAudio.com come from many different sources. Many of them are hand ripped from cds. Others have been downloaded from various other high quality sites on the internet, including HidayahOnline, DawahAcademy,
          {' '}
          <a href="http://kalamullah.com">Kalamullah.com</a>
          ,
          {' '}
          <a href="http://dhikrullah.com">dhikrullah.com</a>
          , and others. Many of the files have also been sent to us by some of our users, may Allah reward them greatly.
        </p>
      </div>
    </div>
  );
};
