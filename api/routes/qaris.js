import { Router } from 'express';

import models from '../models';

const router = Router();

router.get('/', (req, res) => {
  return models.qari.all().then(qaris => res.send(qaris));
});

router.get('/:id', (req, res) => {
  return models.qari.findById(req.params.id).then(qari => res.send(qari));
});

router.get('/:id/audio_files', (req, res) => {
  models.qari.findById(req.params.id).then(qari => {
    qari.getAudioFiles({ include: [ models.surah ] }).then(files => res.send(files));
  });
});

export default router;
