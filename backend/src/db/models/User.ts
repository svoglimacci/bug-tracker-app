import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config';

interface UserAttributes {
  id: number;
  name: string;
  username: string;
  passwordHash: string;
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;

  public name!: string;

  public username!: string;

  public passwordHash!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize,
    underscored: true,
    modelName: 'user',
  },
);

export default User;
