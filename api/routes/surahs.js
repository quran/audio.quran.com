import { Router } from 'express';
import superagent from 'superagent';

import models from '../models';

const router = Router();

router.get('/', (req, res) => {
  superagent.get('http://quran.com:3000/v2/surahs').end((err, response) => res.send(response.body));
});

router.get('/:id', (req, res) => {
  superagent.get(`http://quran.com:3000/v2/surahs/${req.params.id}`).end((err, response) => res.send(response.body));
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
