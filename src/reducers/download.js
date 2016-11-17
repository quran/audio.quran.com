import {
  LOAD,
  LOAD_SUCCESS
} from 'actions/download';

const initialState = {
  errored: false,
  loaded: false,
  entities: {}
};

export default function reducer(state = initialState, action = {}) {
  console.log(action.type);
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
        },
        ...action.result
      };
    default:
      return state;
  }
}
