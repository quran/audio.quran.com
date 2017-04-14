import { LOAD, LOAD_SUCCESS } from 'actions/related';

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
        qaris: action.result.result
      };
    default:
      return state;
  }
}
