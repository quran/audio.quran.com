import { Router } from 'express';

import models from '../models';

const routerInit = Router;
const router = routerInit();

router.get('/', (req, res) => {
  models.surah
    .all()
    .then(surahs => res.send(surahs))
    .catch(error => res.status(500).send({ error }));
});

router.get('/:id', (req, res) => {
  if (req.params.id) {
    return models.surah
      .findById(req.params.id)
      .then(surah => res.send(surah))
      .catch(error => res.status(500).send({ error }));
  }
  res.status(500).send({ error: 'missing or invalid id' });
});

router.get('/:id/audio_files', (req, res) => {
  if (req.params.id) {
    return models.surah
      .findById(req.params.id)
      .then(surah => {
        return surah.getAudioFiles().then(files => res.send(files));
      })
      .catch(error => res.status(500).send({ error }));
  }
  res.status(500).send({ error: 'missing or invalid id' });
});

router.get('/:id/qaris', (req, res) => {
  if (req.params.id) {
    return models.surah
      .findById(req.params.id)
      .then(surah => {
        surah.getQaris().then(qaris => res.send(qaris));
      })
      .catch(error => res.status(500).send({ error }));
  }
  res.status(500).send({ error: 'missing or invalid id' });
});

export default router;
