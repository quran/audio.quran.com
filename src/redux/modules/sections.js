import { arrayOf } from 'normalizr';
import { sectionsSchema } from '../schemas';

const LOAD = '@@quran/sections/LOAD';
const LOAD_SUCCESS = '@@quran/sections/LOAD_SUCCESS';
const LOAD_FAIL = '@@quran/sections/LOAD_FAIL';

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
          ...action.result.entities.sections
        }
      };
    default:
      return state;
  }
}

export function loadAll() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(sectionsSchema),
    promise: (client) => client.get(`/sections`)
  };
}
