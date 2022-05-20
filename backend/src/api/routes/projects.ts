import { Router, Request, Response } from 'express';
import { GetAllProjectsFilters } from '../../db/dal/types';
import * as controller from '../controllers/project';
import { CreateProjectDTO, UpdateProjectDTO } from '../dto/project.dto';

const projectsRouter = Router();

projectsRouter.get('/', async (req: Request, res: Response) => {
  const filters: GetAllProjectsFilters = req.query;
  const results = await controller.getAll(filters);

  return res.status(200).send(results);
});

projectsRouter.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await controller.getById(id);

  return res.status(200).send(result);
});

projectsRouter.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const payload: UpdateProjectDTO = req.body;

  const result = await controller.update(id, payload);

  return res.status(200).send(result);
});

projectsRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await controller.deleteById(id);

  return res.status(200).send({
    success: result,
  });
});

projectsRouter.post('/', async (req: Request, res: Response) => {
  const payload: CreateProjectDTO = req.body;

  const result = await controller.create(payload);

  return res.status(200).send(result);
});

export default projectsRouter;
