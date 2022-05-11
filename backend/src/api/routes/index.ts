import { Router } from 'express';
import loginRouter from './login';
import usersRouter from './users';

const router = Router();

router.use('/users', usersRouter);
router.use('/', loginRouter);

export default router;
