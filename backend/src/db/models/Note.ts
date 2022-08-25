import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config';

interface NoteAttributes {
  id: number;
  summary: string;
  issueId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface NoteInput extends Optional<NoteAttributes, 'id'> {}

export interface NoteOutput extends Required<NoteAttributes> {}

class Note extends Model<NoteAttributes, NoteInput> implements NoteAttributes {
  public id!: number;

  public summary!: string;

  public issueId!: number;

  public userId!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date;
}

Note.init(
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
    issueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'issues', key: 'id' },
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
    modelName: 'note',
  },
);

export default Note;
