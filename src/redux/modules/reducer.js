import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';

import audioplayer from './audioplayer';
import qaris from './qaris';
import sections from './sections';
import surahs from './surahs';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  audioplayer,
  qaris,
  sections,
  surahs
});
