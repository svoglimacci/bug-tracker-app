import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config';

interface IssueAttributes {
  id: number;
  summary: string;
  priority: string;
  status: string;
  projectId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IssueInput extends Optional<IssueAttributes, 'id'> {
  notes?: any;
}

export interface IssueOutput extends Required<IssueAttributes> {
  notes?: any;
}

class Issue extends Model<IssueAttributes, IssueInput> implements IssueAttributes {
  public id!: number;

  public summary!: string;

  public priority!: string;

  public status!: string;

  public projectId!: number;

  public userId!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date;
}

Issue.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'projects', key: 'id' },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'issue',
  },
);

export default Issue;
