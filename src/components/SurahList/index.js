import React from 'react';
import zeroPad from 'utils/zeroPad';
import Track from 'components/Audioplayer/Track';
import LinkContainer from 'utils/LinkContainer';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'quran-components/lib/Button';

import formatSeconds from 'utils/formatSeconds';
const styles = require('./styles.scss');
export default ({ surahs, qari, files, progress, currentSurah, isPlaying, currentQari, currentTime, handleSurahSelection }) => {
  const currentSurahTime = (surah) => {
    return (surah.id === currentSurah.id) ? `${formatSeconds(currentTime)} / ` : '';
  };

  const progressBarStyle = { position: 'absolute', bottom: '-5px', height: '2px' };

  return (
    <div className={styles.list}>
      <div className={`panel panel-default ${styles.panel} ${isPlaying ? styles.panelPlaying : ''}`}>
        <ul className="list-group">
          {
            Object.values(surahs).filter(surah => files[surah.id]).map(surah => (
              <li
                key={surah.id}
                className={`list-group-item ${styles.row} ${(surah.id === currentSurah.id && currentQari.id === qari.id) ? `${styles.active}` : ''}`}
                onClick={() => handleSurahSelection(surah)}
              >
                <Row className={styles.surahRow}>
                  <Col md={4} xs={8}>
                    <Row>
                      <Col md={2} xs={2}>
                        <h5 className={styles.numbering}>
                          <span className={styles.muted}>
                            <span className="index">{surah.id}.</span>
                            <i className="fa fa-play-circle fa-lg" />
                          </span>
                        </h5>
                      </Col>
                      <Col md={9} xs={9}>
                        <h5 className={`text-muted`}>Surat {surah.name.simple}</h5>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6} className="text-right hidden-xs hidden-sm">
                    <LinkContainer to={`/sura/${surah.id}`}>
                      <Button
                        color="inverted"
                        className={styles.options}
                        onClick={(event) => event.stopPropagation()}>
                        <i className="fa fa-users" /> Other Qaris
                      </Button>
                    </LinkContainer>
                    <Button
                      color="inverted"
                      className={styles.options}
                      href={`https://www.quran.com/${surah.id}`}
                      target="_blank"
                      onClick={(event) => event.stopPropagation()}>
                      <i className="fa fa-book" /> Read
                    </Button>
                    <Button
                      color="inverted"
                      className={styles.options}
                      href={`http://download.quranicaudio.com/quran/${qari.relativePath}${zeroPad(surah.id, 3)}.mp3`}
                      target="_blank"
                      onClick={(event) => event.stopPropagation()}>
                      <i className="fa fa-arrow-circle-down" /> Download
                    </Button>
                  </Col>
                  <Col md={2} xs={4} className="text-right">
                    <h5 className={`text-muted ${styles.muted}`}>
                      {currentSurahTime(surah)}{formatSeconds(files[surah.id].format.duration)}
                    </h5>
                  </Col>
                </Row>
                {surah.id === currentSurah.id ? <Track progress={progress} simple style={progressBarStyle} /> : false}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};
