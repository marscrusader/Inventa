import { DataTypes } from 'sequelize'
import SequelizeSetup from '../database'
import { InventoryCategoryStatic } from '../interfaces/category'
import CollectionModel from './collection'

// Model defined here is for type purpose, db models with migrations are defined in collection.sql
const CategoryModel: InventoryCategoryStatic = SequelizeSetup.define('categories', {
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
  tableName: 'categories'
})

CategoryModel.belongsTo(CollectionModel, { foreignKey: 'collectionId' })
export default CategoryModel
