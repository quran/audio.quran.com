import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';

import audioplayer from './audioplayer';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  audioplayer
});
