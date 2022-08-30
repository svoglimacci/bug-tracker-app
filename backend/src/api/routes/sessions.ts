import { Router, Request, Response } from 'express';
import * as sessionController from '../controllers/session';
import { LoginDTO } from '../dto/session.dto';

const sessionsRouter = Router();

sessionsRouter.post('/login', async (req: Request, res: Response) => {
  const payload: LoginDTO = req.body;
  try {
    const result = await sessionController.login(payload);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }
});

sessionsRouter.delete('/logout', async (req: Request, res: Response) => {
  const id = Number(req.body.userId);
  console.log('this is backend id', id);
  const result = await sessionController.logout(id);
  return res.status(204).send({
    success: result,
  });
});

export default sessionsRouter;
