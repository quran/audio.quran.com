import { Router } from 'express';

import models from '../models';

const router = Router();

router.get('/', (req, res) => {
  return models.qari.all().then(qaris => res.send(qaris));
});

router.get('/:id', (req, res) => {
  return models.qari.findById(req.params.id).then(qari => res.send(qari));
});

export default router;
