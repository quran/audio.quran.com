import { Router } from 'express';
import models from '../models';

const routerInit = Router;
const router = routerInit();

router.get('/', (req, res) => {
  return models.audioFile
    .all({ include: [models.qari] })
    .then(files => res.send(files))
    .catch(error => res.status(500).send({ error }));
});

router.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.status(500).send({ error: 'missing or invalid id' });
  }

  models.audioFile
    .findById(req.params.id)
    .then(files => res.send(files))
    .catch(error => res.status(500).send({ error }));
});

router.get('/download/:id', (req, res) => {
  if (!req.params.id) {
    res.status(500).send({ error: 'missing or invalid id' });
  }

  models.audioFile
    .findOne({ where: { id: req.params.id, extension: 'mp3' } })
    .then(files => res.send(files))
    .catch(error => res.status(500).send({ error }));
});

export default router;
