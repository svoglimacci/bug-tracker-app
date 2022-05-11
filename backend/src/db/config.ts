import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
  process.env.PGDATABASE || 'postgres',
  process.env.PGUSER || 'postgres',
  process.env.PGPASSWORD || 'password',
  {
    host: process.env.PGHOST,
    dialect: 'postgres',
  },
);

export const SECRET = process.env.SECRET || 'secret';
export default sequelize;
