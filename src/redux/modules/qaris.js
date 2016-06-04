import { arrayOf } from 'normalizr';
import { qarisSchema } from '../schemas';

const LOAD = '@@quran/qaris/LOAD';
const LOAD_SUCCESS = '@@quran/qaris/LOAD_SUCCESS';
const LOAD_FAIL = '@@quran/qaris/LOAD_FAIL';

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
          ...action.result.entities.qaris
        }
      };
    default:
      return state;
  }
}

export function loadAll() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(qarisSchema),
    promise: (client) => client.get(`/qaris`)
  };
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(qarisSchema),
    promise: (client) => client.get(`/qaris/${id}`)
  };
}
