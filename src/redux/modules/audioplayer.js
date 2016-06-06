// import { buildAudioFromHash, testIfSupported } from '../../helpers/buildAudio';

const LOAD = '@@quran/audioplayer/LOAD';
const UPDATE = '@@quran/audioplayer/UPDATE';
const SET_USER_AGENT = '@@quran/audioplayer/SET_USER_AGENT';
const SET_CURRENT_FILE = '@@quran/audioplayer/SET_CURRENT_FILE';
const PLAY = '@@quran/audioplayer/PLAY';
const PAUSE = '@@quran/audioplayer/PAUSE';
const PLAY_PAUSE = '@@quran/audioplayer/PLAY_PAUSE';
const REPEAT = '@@quran/audioplayer/REPEAT';

const initialState = {
  file: null,
  userAgent: null,
  currentFile: null,
  isSupported: true,
  isPlaying: false,
  shouldRepeat: false,
  progress: 0,
  currentTime: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      if (__CLIENT__) {
        return {
          ...state,
          isPlaying: false,
          file: new Audio(action.url)
        };
      }

      return state;
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
        shouldRepeat: !state.shouldRepeat
      };
    case SET_CURRENT_FILE:
      return {
        ...state,
        currentFile: action.file
      };
    default:
      return state;
  }
}

export function setUserAgent(userAgent) {
  return {
    type: SET_USER_AGENT,
    userAgent
  };
}

export function setCurrentFile(file) {
  return {
    type: SET_CURRENT_FILE,
    file
  };
}

export function play() {
  return {
    type: PLAY
  };
}

export function pause() {
  return {
    type: PAUSE
  };
}

export function playPause() {
  return {
    type: PLAY_PAUSE
  };
}

export function repeat() {
  return {
    type: REPEAT
  };
}

export function load(url) {
  return {
    type: LOAD,
    url
  };
}

export function update(payload) {
  return {
    type: UPDATE,
    payload
  };
}
