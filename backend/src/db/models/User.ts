import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;

  public username!: string;

  public password!: string;
}

User.init(
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
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const passwordHash = await bcrypt.hash(user.password, 10);
          // eslint-disable-next-line no-param-reassign
          user.password = passwordHash;
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const passwordHash = await bcrypt.hash(user.password, 10);
          // eslint-disable-next-line no-param-reassign
          user.password = passwordHash;
        }
      },
    },
    timestamps: false,
    sequelize,
    underscored: true,
    modelName: 'user',
  },
);

export default User;
