import zeroPad from 'utils/zeroPad';

import {
  PREVIOUS,
  NEXT,
  RANDOM,
  CONTINUOUS,
  REPEAT,
  PLAY_PAUSE,
  PAUSE,
  PLAY,
  SET_CURRENT_FILE,
  SET_USER_AGENT,
  UPDATE,
  LOAD,
  AUDIO_URL
} from 'actions/audioplayer';

const initialState = {
  file: null,
  userAgent: null,
  currentFile: null,
  isSupported: true,
  isPlaying: false,
  shouldRepeat: false,
  shouldContinuous: false,
  shouldRandom: false,
  progress: 0,
  currentTime: 0,
  surahPage: false,
  qaris: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD: {
      if (__CLIENT__) {
        const file = new Audio(`${AUDIO_URL}/${action.qari.relativePath}${zeroPad(action.surah.id, 3)}.mp3`);
        file.play();

        if (action.surahPage) {
          state.qaris = action.qaris;
          state.qari = action.qair;
        }

        file.title = `${action.surah.name.simple} - ${action.qari.name}`;
        return {
          ...state,
          isPlaying: true,
          qari: action.qari,
          surah: action.surah,
          surahPage: action.surahPage,
          file
        };
      }

      return state;
    }
    case UPDATE:
      return {
        ...state,
        ...action.payload
      };
    case SET_USER_AGENT:
      return {
        ...state,
        userAgent: action.userAgent
      };
    case PLAY:
      return {
        ...state,
        isPlaying: true
      };
    case PAUSE:
      return {
        ...state,
        isPlaying: false
      };
    case PLAY_PAUSE:
      if (!state.file) return state;
      if (state.file.paused && state.file.readyState >= 3) {
        state.file.play();
      } else if (!state.file.paused && state.file.readyState >= 3) {
        state.file.pause();
      }

      return {
        ...state,
        isPlaying: !state.isPlaying
      };
    case REPEAT:
      return {
        ...state,
        shouldContinuous: false,
        shouldRepeat: !state.shouldRepeat
      };
    case CONTINUOUS:
      return {
        ...state,
        shouldRepeat: false,
        shouldRandom: false,
        shouldContinuous: !state.shouldContinuous
      };
    case RANDOM:
      return {
        ...state,
        shouldRepeat: false,
        shouldContinuous: false,
        shouldRandom: !state.shouldRandom
      };
    case SET_CURRENT_FILE:
      return {
        ...state,
        currentFile: action.file
      };
    case NEXT: {
      state.file.pause();
      let file = null;
      let newState = {};
      if (state.surahPage) {
        const nextQari = state.qaris[state.qari.id + 1];
        file.title = `action.surah - ${nextQari.name}`;
        file = new Audio(`${AUDIO_URL}/${nextQari.relativePath}${zeroPad(state.surah.id, 3)}.mp3`);
        file.play();
        newState = {
          ...state,
          isPlaying: true,
          surah: state.surah,
          qari: nextQari,
          file
        };
      } else {
        file = new Audio(`${AUDIO_URL}/${state.qari.relativePath}${zeroPad(state.surah.id + 1, 3)}.mp3`);
        file.title = `action.surah - ${state.qari.name}`;
        newState = {
          ...state,
          isPlaying: true,
          surah: action.surahs[state.surah.id] || state.surah,
          qari: action.qari || state.qari,
          file
        };
      }
      file.play();
      return newState;
    }
    case PREVIOUS: {
      state.file.pause();
      let newState = {};
      let file = null;
      if (state.surahPage) {
        const previusQari = state.qaris[state.qari.id - 1];
        file = new Audio(`${AUDIO_URL}/${previusQari.relativePath}${zeroPad(state.surah.id, 3)}.mp3`);
        newState = {
          ...state,
          isPlaying: true,
          surah: state.surah,
          qari: previusQari,
          file
        };
      } else {
        file = new Audio(`${AUDIO_URL}/${state.qari.relativePath}${zeroPad(state.surah.id - 1, 3)}.mp3`);
        newState = {
          ...state,
          isPlaying: true,
          surah: action.surahs[state.surah.id - 2] || state.surah,
          qari: action.qari || state.qari,
          file
        };
      }

      file.title = `action.surah - ${action.qari}`;
      file.play();
      return newState;
    }
    default:
      return state;
  }
}
