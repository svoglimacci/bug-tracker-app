import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config';

interface AuthAttributes {
  id: number;
  username: string;
  password: string;
}

export interface AuthInput extends Optional<AuthAttributes, 'id'> {}
export interface AuthOutput extends Required<AuthAttributes> {}

class Auth extends Model<AuthAttributes, AuthInput> implements AuthAttributes {
  public id!: number;

  public username!: string;

  public password!: string;
}

Auth.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize,
    underscored: true,
    modelName: 'auth',
  },
);

export default Auth;
