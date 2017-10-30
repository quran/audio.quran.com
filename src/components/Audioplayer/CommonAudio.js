export default class CommonAudio {
  static handleTrackChange(fraction) {
    const { file, update } = this.props; // eslint-disable-line no-shadow

    update({
      progress: fraction * 100,
      currentTime: fraction * file.duration
    });

    file.currentTime = fraction * file.duration;
  }

  static handleFileLoad(file) {
    const { update } = this.props; // eslint-disable-line no-shadow

    // Preload file
    file.setAttribute('preload', 'auto');

    const onLoadeddata = () => {
      // Default current time to zero. This will change
      file.currentTime = 0; // eslint-disable-line no-param-reassign

      update({
        duration: file.duration
      });
    };

    const onTimeupdate = () => {
      const progress = file.currentTime / file.duration * 100;

      update({
        progress,
        currentTime: file.currentTime,
        isPlaying: !file.paused
      });
    };

    const onEnded = () => {
      const { shouldRepeat, shouldContinuous, shouldRandom } = this.props;

      if (shouldRepeat) {
        file.pause();
        file.currentTime = 0; // eslint-disable-line no-param-reassign
        file.play();
      } else if (shouldContinuous) {
        const { surah, surahs, qari } = this.props; // eslint-disable-line no-shadow
        this.props.load({ surah: Object.values(surahs)[surah.id], qari: qari });
      } else if (shouldRandom) {
        const { surahs, qari } = this.props; // eslint-disable-line no-shadow
        const randomSurah = Math.floor(Math.random() * (113 + 1));
        this.props.load({
          surah: Object.values(surahs)[randomSurah],
          qari: qari
        });
      } else {
        if (file.readyState >= 3 && file.paused) {
          file.pause();
        }

        update({
          surah: null,
          isPlaying: false
        });
      }
    };

    const onPlay = () => {};

    file.onloadeddata = onLoadeddata;
    file.ontimeupdate = onTimeupdate;
    file.onplay = onPlay;
    file.onended = onEnded;
  }

  static handleRemoveFileListeneres(file) {
    if (file) {
      file.pause();
      file.onloadeddata = null;
      file.ontimeupdate = null;
      file.onplay = null;
      file.onended = null;
    }
  }

  static isPlayPreviousDisabled() {
    const { surah, surahPage, qari } = this.props; // eslint-disable-line no-shadow
    const disableBasedOnSurah = surah ? surah.id === 1 && true : true;
    const disabled = surahPage ? qari.id === 1 && true : disableBasedOnSurah;
    return disabled;
  }

  static isPlayNextDisabled() {
    const { surah, qaris, surahPage, qari } = this.props; // eslint-disable-line no-shadow
    const disableBasedOnSurah = surah ? surah.id === 114 && true : true;
    const disabled = surahPage
      ? qari.id === Object.keys(qaris).length
      : disableBasedOnSurah;
    return disabled;
  }

  static handleKeyboardEvent(event) {
    const { code } = event;
    const { previous, next, playPause, surahs } = this.props; // eslint-disable-line no-shadow
    if (code === 'Space') {
      event.preventDefault();
      playPause();
    } else if (
      (code === 'ArrowRight' || code === 'ArrowDown') &&
      !this.isPlayNextDisabled()
    ) {
      event.preventDefault();
      next({ surahs: Object.values(surahs) });
    } else if (
      (code === 'ArrowLeft' || code === 'ArrowUp') &&
      !this.isPlayPreviousDisabled()
    ) {
      event.preventDefault();
      previous({ surahs: Object.values(surahs) });
    }
  }
}
