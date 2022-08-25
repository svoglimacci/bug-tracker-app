import { Router, Request, Response } from 'express';
import { GetAllNotesFilters } from '../../db/dal/types';
import * as controller from '../controllers/notes';
import { CreateNoteDTO, UpdateNoteDTO } from '../dto/note.dto';

const notesRouter = Router();

notesRouter.get('/', async (req: Request, res: Response) => {
  const filters: GetAllNotesFilters = req.query;
  const results = await controller.getAll(filters);

  return res.status(200).send(results);
});

notesRouter.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await controller.getById(id);

  return res.status(200).send(result);
});

notesRouter.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const payload: UpdateNoteDTO = req.body;

  const result = await controller.update(id, payload);

  return res.status(200).send(result);
});

notesRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await controller.deleteById(id);

  return res.status(200).send({
    success: result,
  });
});

notesRouter.post('/', async (req: Request, res: Response) => {
  const payload: CreateNoteDTO = req.body;
  const result = await controller.create(payload);

  return res.status(200).send(result);
});

export default notesRouter;
