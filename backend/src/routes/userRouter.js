import { Router } from 'express';

import userController from "../controllers/userController";

const router = Router();

router.get('/', userController.get);
router.get('/ids', userController.getIds);
router.get('/check', userController.check);
router.post('/create', userController.create);
router.post('/activate', userController.activate);

export default router;