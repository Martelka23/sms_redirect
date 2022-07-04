import { Router } from 'express';

import messsageController from '../controllers/messsageController.js';

const router = Router();

router.get('/', messsageController.get);

router.post('/', messsageController.postMessage);

export default router;