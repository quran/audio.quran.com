import qaris from './qaris';
import audioFiles from './audio_files';
import surahs from './surahs';
import sections from './sections';

export default app => {
  app.use('/qaris', qaris);
  app.use('/audio_files', audioFiles);
  app.use('/surahs', surahs);
  app.use('/sections', sections);
  app.use('/', (req, res) =>
    res.end(
      `
      API:
      Qaris: '/qaris'
      audio_files: '/audio_files'
      surahs: '/surahs'
      sections: '/sections'
    `
    )
  );
};
