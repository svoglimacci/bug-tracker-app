import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config';

interface SessionAttributes {
  id: number;
  userId: number;
  token: string;
}

export interface SessionInput extends Optional<SessionAttributes, 'id'> {}
export interface SessionOutput extends Required<SessionAttributes> {}

class Session extends Model<SessionAttributes, SessionInput> implements SessionAttributes {
  public id!: number;

  public userId!: number;

  public token!: string;
}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'session',
  },
);

export default Session;
