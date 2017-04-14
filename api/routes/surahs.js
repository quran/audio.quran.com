import { Router } from 'express';

import models from '../models';

const routerInit = Router;
const router = routerInit();

router.get('/', (req, res) => {
  models.surah.all().then(surahs => res.send(surahs));
});

router.get('/:id', (req, res) => {
  models.surah.findById(req.params.id).then(surah => res.send(surah));
});

router.get('/:id/audio_files', (req, res) => {
  models.surah.findById(req.params.id).then(surah => {
    surah.getAudioFiles().then(files => res.send(files));
  });
});

router.get('/:id/qaris', (req, res) => {
  models.surah.findById(req.params.id).then(surah => {
    surah.getQaris().then(qaris => res.send(qaris));
  });
});

export default router;
