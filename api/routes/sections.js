import { Router } from 'express';

import models from '../models';
const routerInit = Router;
const router = routerInit();

router.get('/', (req, res) => {
  models.section.all().then(sections => res.send(sections));
});

export default router;
