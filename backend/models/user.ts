import { DataTypes } from 'sequelize/types'
import SequelizeSetup from '../database'

// Model defined here is for type purpose, db models with migrations are defined in user.sql
const UserModel = SequelizeSetup.define('users', {
  id: {
    type: DataTypes.INTEGER
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
