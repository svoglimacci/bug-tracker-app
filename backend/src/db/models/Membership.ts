import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config';

interface MembershipAttributes {
  id: number;
  userId: number;
  projectId: number;
}

export interface MembershipInput extends Optional<MembershipAttributes, 'id'> {}

export interface MembershipOutput extends Required<MembershipAttributes> {}

class Membership
  extends Model<MembershipAttributes, MembershipInput>
  implements MembershipAttributes
{
  public id!: number;

  public userId!: number;

  public projectId!: number;
}

Membership.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'projects', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'membership',
  },
);

export default Membership;
