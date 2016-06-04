import { Router } from 'express';
import superagent from 'superagent';

import models from '../models';

const router = Router();

router.get('/', (req, res) => {
  models.section.all().then(sections => res.send(sections));
});

export default router;
