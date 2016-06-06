import { arrayOf } from 'normalizr';
import { surahsSchema } from '../schemas';

const LOAD = '@@quran/surahs/LOAD';
const LOAD_SUCCESS = '@@quran/surahs/LOAD_SUCCESS';
const LOAD_FAIL = '@@quran/surahs/LOAD_FAIL';

const initialState = {
  errored: false,
  loaded: false,
  current: null,
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
          ...action.result.entities.surahs
        }
      };
    default:
      return state;
  }
}

export function loadAll() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(surahsSchema),
    promise: (client) => client.get(`/surahs`)
  };
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(surahsSchema),
    promise: (client) => client.get(`/surahs/${id}`)
  };
}
