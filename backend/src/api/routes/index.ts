import { Router } from 'express';
import sessionsRouter from './sessions';
import projectsRouter from './projects';
import usersRouter from './users';
import issuesRouter from './issues';
import notesRouter from './notes';

const router = Router();

router.use('/', sessionsRouter);
router.use('/users', usersRouter);
router.use('/projects', projectsRouter);
router.use('/issues', issuesRouter);
router.use('/notes', notesRouter);
export default router;
