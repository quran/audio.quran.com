import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';

import audioplayer from 'reducers/audioplayer';
import qaris from 'reducers/qaris';
import sections from 'reducers/sections';
import surahs from 'reducers/surahs';
import files from 'reducers/files';
import related from 'reducers/related';
import download from 'reducers/download';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  audioplayer,
  files,
  qaris,
  sections,
  surahs,
  download,
  related
});
