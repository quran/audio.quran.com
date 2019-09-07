import { Router } from 'express';

import models from '../models';

const routerInit = Router;
const router = routerInit();

router.get('/', (req, res) => {
  return models.qari
    .all()
    .then(qaris => res.send(qaris))
    .catch(error => res.status(500).send({ error }));
});

router.get('/audio_files', (req, res) => {
  return models.qari
    .all({ include: [models.audioFile] })
    .then(qaris => res.send(qaris))
    .catch(error => res.status(500).send({ error }));
});

router.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.status(500).send({ error: 'missing or invalid id' });
  }

  models.qari
    .findById(req.params.id)
    .then(qari => res.send(qari))
    .catch(error => res.status(500).send({ error }));
});

router.get('/:id/audio_files', (req, res) => {
  if (!req.params.id) {
    res.status(500).send({ error: 'missing or invalid id' });
  }

  models.qari
    .findById(req.params.id)
    .then(qari => {
      return qari
        .getAudioFiles({ order: 'surah_id' })
        .then(files => res.send(files));
    })
    .catch(error => res.status(500).send({ error }));
});

router.get('/:id/audio_files/:type', (req, res) => {
  if (!req.params.id) {
    res.status(500).send({ error: 'missing or invalid id' });
  }

  models.qari
    .findById(req.params.id)
    .then(qari => {
      return qari
        .getAudioFiles({
          order: 'surah_id',
          where: { extension: req.params.type }
        })
        .then(files => res.send(files));
    })
    .catch(error => res.status(500).send({ error }));
});

router.get('/related/:id', (req, res) => {
  if (!req.params.id) {
    res.status(500).send({ error: 'missing or invalid id' });
  }

  models.related
    .findAll({ where: { qari: req.params.id } })
    .then(related => res.send(related))
    .catch(error => res.status(500).send({ error }));
});

export default router;
