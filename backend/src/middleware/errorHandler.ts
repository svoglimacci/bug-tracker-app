import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line consistent-return
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error.message);

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.status(400).send({ message: 'Something went wrong.' });

  next(error);
};

export default errorHandler;
