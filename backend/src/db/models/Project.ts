import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config';

interface ProjectAttributes {
  id: number;
  title: string;
  author: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ProjectInput extends Optional<ProjectAttributes, 'id'> {}

export interface ProjectOutput extends Required<ProjectAttributes> {}

class Project extends Model<ProjectAttributes, ProjectInput> implements ProjectAttributes {
  public id!: number;

  public title!: string;

  public author!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'project',
  },
);

export default Project;
