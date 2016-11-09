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
  currentTime: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD: {
      if (__CLIENT__) {
        const file = new Audio(`${AUDIO_URL}/${action.qari.relativePath}${zeroPad(action.surah.id, 3)}.mp3`);
        file.play();

        return {
          ...state,
          isPlaying: true,
          qari: action.qari,
          surah: action.surah,
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
        debugger;
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
      const file = new Audio(`${AUDIO_URL}/${state.qari.relativePath}${zeroPad(state.surah.id + 1, 3)}.mp3`);
      file.play();
      return {
        ...state,
        isPlaying: true,
        surah: action.surahs[state.surah.id] || state.surah,
        qari: action.qari || state.qari,
        file
      };
    }
    case PREVIOUS: {
      state.file.pause();
      const file = new Audio(`${AUDIO_URL}/${state.qari.relativePath}${zeroPad(state.surah.id - 1, 3)}.mp3`);
      file.play();
      return {
        ...state,
        isPlaying: true,
        surah: action.surahs[state.surah.id - 2] || state.surah,
        qari: action.qari || state.qari,
        file
      };
    }
    default:
      return state;
  }
}
