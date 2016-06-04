import { Router } from 'express';
import superagent from 'superagent';

import models from '../models';

const router = Router();

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
