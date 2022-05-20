import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import routes from './api/routes';
import dbInit from './db/init';

dbInit();
const PORT = 3001;

export const get = () => {
  const app: Application = express();
  app.use(express.json());
  app.use(cors());

  app.get('/', async (req: Request, res: Response) => {
    res.status(202).send({
      message: `Welcome to bugtracker API! \n Endpoints available at http://localhost:${PORT}/api/v1`,
    });
  });

  app.use('/api/', routes);

  return app;
};

export const start = () => {
  const app = get();
  try {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.log(`Error occurred: ${error.message}`);
  }
};

start();
