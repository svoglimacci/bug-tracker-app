import { Router, Request, Response } from 'express';
import { LoginAuthDTO, LogoutAuthDTO } from '../dto/auth.dto';
import * as authController from '../controllers/auth';

const loginRouter = Router();

loginRouter.post('/login', async (req: Request, res: Response) => {
  const payload: LoginAuthDTO = req.body;
  const result = await authController.login(payload);
  return res.status(200).send(result);
});

loginRouter.delete('/logout', async (req: Request, res: Response) => {
  const payload: LogoutAuthDTO = req.body;
  const result = await authController.logout(payload);
  return res.status(200).send(result);
});
export default loginRouter;
