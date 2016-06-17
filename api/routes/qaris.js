import { Router } from 'express';

import models from '../models';

const router = Router();

router.get('/', (req, res) => {
  return models.qari.all().then(qaris => res.send(qaris));
});

router.get('/audio_files', (req, res) => {
  return models.qari.all({ include: [ models.audioFile ] }).then(qaris => res.send(qaris));
});

router.get('/:id', (req, res) => {
  return models.qari.findById(req.params.id).then(qari => res.send(qari));
});

router.get('/:id/audio_files', (req, res) => {
  models.qari.findById(req.params.id).then(qari => {
    qari.getAudioFiles({ order: 'surah_id' }).then(files => res.send(files));
  });
});

router.get('/:id/audio_files/:type', (req, res) => {
  models.qari.findById(req.params.id).then(qari => {
    qari.getAudioFiles({ order: 'surah_id', where: { extension: req.params.type } }).then(files => res.send(files));
  });
});


export default router;
