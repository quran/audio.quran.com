import zeroPad from 'utils/zeroPad';

const AUDIO_URL = 'http://download.quranicaudio.com/quran';
const LOAD = '@@quran/audioplayer/LOAD';
const UPDATE = '@@quran/audioplayer/UPDATE';
const SET_USER_AGENT = '@@quran/audioplayer/SET_USER_AGENT';
const SET_CURRENT_FILE = '@@quran/audioplayer/SET_CURRENT_FILE';
const PLAY = '@@quran/audioplayer/PLAY';
const PAUSE = '@@quran/audioplayer/PAUSE';
const PLAY_PAUSE = '@@quran/audioplayer/PLAY_PAUSE';
const REPEAT = '@@quran/audioplayer/REPEAT';
const CONTINUOUS = '@@quran/audioplayer/CONTINUOUS';
const RANDOM = '@@quran/audioplayer/RANDOM';
const NEXT = '@@quran/audioplayer/NEXT';
const PREVIOUS = '@@quran/audioplayer/PREVIOUS';

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
        qari: action.qari || state.qari,
        surah: action.surah || state.surah,
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
        qari: action.qari,
        surah: action.surah,
        file
      };
    }
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

export function continuous() {
  return {
    type: CONTINUOUS
  };
}

export function random() {
  return {
    type: RANDOM
  };
}

export function load({ surah, qari }) {
  return {
    type: LOAD,
    surah,
    qari
  };
}

export function update(payload) {
  return {
    type: UPDATE,
    payload
  };
}

export function next() {
  return {
    type: NEXT
  };
}

export function previous() {
  return {
    type: PREVIOUS
  };
}
