import { LOAD, LOAD_SUCCESS } from 'actions/files';

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
