import { arrayOf } from 'normalizr';
import { filesSchema } from '../schemas';

const LOAD = '@@quran/files/LOAD';
const LOAD_SUCCESS = '@@quran/files/LOAD_SUCCESS';
const LOAD_FAIL = '@@quran/files/LOAD_FAIL';

const initialState = {
  errored: false,
  loaded: false,
  entities: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loaded: true,
        errored: false,
        entities: {
          ...state.entities,
          [action.id]: action.result.entities.files
        }
      };
    default:
      return state;
  }
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(filesSchema),
    promise: (client) => client.get(`/qaris/${id}/audio_files/mp3`),
    id
  };
}
