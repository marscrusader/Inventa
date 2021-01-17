import { DataTypes } from 'sequelize/types'
import SequelizeSetup from '../database'
import CollectionModel from './collection'

// Model defined here is for type purpose, db models with migrations are defined in inventory.sql
const InventoryModel = SequelizeSetup.define('inventories', {
  id: {
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  category: {
    type: DataTypes.STRING(50)
  },
  collectionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  s3Id: {
    type: DataTypes.TEXT
  },
  s3ThumbnailId: {
    type: DataTypes.TEXT
  },
  serialNumber: {
    type: DataTypes.TEXT,
    unique: true
  },
  status: {
    type: DataTypes.STRING(50)
  },
  cost: {
    type: DataTypes.INTEGER
  },
  salePrice: {
    type: DataTypes.INTEGER
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  schema: 'inventa',
  tableName: 'inventories'
})

InventoryModel.belongsTo(CollectionModel, { foreignKey: 'collectionId' })
export default InventoryModel
