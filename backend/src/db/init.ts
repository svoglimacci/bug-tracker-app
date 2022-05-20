import * as dotenv from 'dotenv';
import { Session, User, Project } from './models';

dotenv.config();

const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV !== 'test';

const dbInit = () => {
  User.sync({ alter: isDev || isTest });
  Session.sync({ alter: isDev || isTest });
  Project.sync({ alter: isDev || isTest });
};

export default dbInit;
