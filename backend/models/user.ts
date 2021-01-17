import { DataTypes } from 'sequelize'
import SequelizeSetup from '../database'
import { UserStatic } from '../interfaces/user'

// Model defined here is for type purpose, db models with migrations are defined in user.sql
const UserModel: UserStatic = SequelizeSetup.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lastName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  auth0Id: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  schema: 'inventa',
  tableName: 'users'
})

export default UserModel
