import { LOAD, LOAD_SUCCESS } from 'actions/sections';

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
