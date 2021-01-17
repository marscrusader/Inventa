import { DataTypes } from 'sequelize'
import SequelizeSetup from '../database'
import { InventoryStatusStatic } from '../interfaces/status'
import CollectionModel from './collection'

// Model defined here is for type purpose, db models with migrations are defined in collection.sql
const StatusModel: InventoryStatusStatic = SequelizeSetup.define('status', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    primaryKey: true
  },
  collectionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  schema: 'inventa',
  tableName: 'status'
})

StatusModel.belongsTo(CollectionModel, { foreignKey: 'collectionId' })
export default StatusModel
