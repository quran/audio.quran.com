import { Router } from 'express';

import models from '../models';

const router = Router();

router.get('/', (req, res) => {
  return models.surah.all().then(surah => res.send(surah));
});

router.get('/:id', (req, res) => {
  return models.surah.findById(req.params.id).then(surah => res.send(surah));
});

router.get('/:id/audio_files', (req, res) => {
  models.surah.findById(req.params.id).then(surah => {
    surah.getAudioFiles({ include: [ models.qari ] }).then(files => res.send(files));
  });
});

router.get('/:id/qaris', (req, res) => {
  models.surah.findById(req.params.id).then(surah => {
    surah.getQaris().then(qaris => res.send(qaris));
  });
});

export default router;
