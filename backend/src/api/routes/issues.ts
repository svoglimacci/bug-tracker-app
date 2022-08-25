import { Router, Request, Response } from 'express';
import { GetAllIssuesFilters } from '../../db/dal/types';
import * as controller from '../controllers/issues';
import { CreateIssueDTO, UpdateIssueDTO } from '../dto/issue.dto';

const issuesRouter = Router();

issuesRouter.get('/', async (req: Request, res: Response) => {
  const filters: GetAllIssuesFilters = req.query;
  const results = await controller.getAll(filters);

  return res.status(200).send(results);
});

issuesRouter.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await controller.getById(id);

  return res.status(200).send(result);
});

issuesRouter.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const payload: UpdateIssueDTO = req.body;

  const result = await controller.update(id, payload);

  return res.status(200).send(result);
});

issuesRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await controller.deleteById(id);

  return res.status(200).send({
    success: result,
  });
});

issuesRouter.post('/', async (req: Request, res: Response) => {
  const payload: CreateIssueDTO = req.body;
  const result = await controller.create(payload);

  return res.status(200).send(result);
});

export default issuesRouter;
