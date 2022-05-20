import { Router } from 'express';
import sessionsRouter from './sessions';

const router = Router();

router.use('/', sessionsRouter);

export default router;
