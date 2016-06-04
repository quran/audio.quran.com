import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';

import audioplayer from './audioplayer';
import qaris from './qaris';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  audioplayer,
  qaris
});
