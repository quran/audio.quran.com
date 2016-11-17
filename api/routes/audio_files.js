import { Router } from 'express';

import models from '../models';

const router = Router();

router.get('/', (req, res) => {
  return models.audioFile.all({ include: [models.qari] }).then(files => res.send(files));
});

router.get('/:id', (req, res) => {
  return models.audioFile.findById(req.params.id).then(files => res.send(files));
});

router.get('/download/:id', (req, res) => {
  return models.audioFile.findOne({ where: {id: req.params.id, extension: 'mp3'} }).then(files => res.send(files));
});

export default router;
