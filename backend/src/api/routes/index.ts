import { Router } from 'express';
import sessionsRouter from './sessions';
import projectsRouter from './projects';

const router = Router();

router.use('/', sessionsRouter);
router.use('/projects', projectsRouter);

export default router;
