import { DataTypes } from 'sequelize'
import SequelizeSetup from '../database'
import { CollectionStatic } from '../interfaces/collection'
import UserModel from './user'

// Model defined here is for type purpose, db models with migrations are defined in collection.sql
const CollectionModel: CollectionStatic = SequelizeSetup.define('collections', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  s3Id: {
    type: DataTypes.TEXT
  },
  s3ThumbnailId: {
    type: DataTypes.TEXT
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  schema: 'inventa',
  tableName: 'collections'
})

CollectionModel.belongsTo(UserModel, { foreignKey: 'userId' })
export default CollectionModel
