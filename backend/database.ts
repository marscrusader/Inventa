import sequelize, { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()
let dbConnection: Sequelize | null = null
if (process.env.POSTGRES_DB && process.env.POSTGRES_USER && process.env.POSTGRES_PASSWORD) {
  dbConnection = new sequelize.Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
      host: process.env.POSTGRES_HOST,
      dialect: 'postgres'
    }
  );
}

if (!dbConnection) throw 'Database is not set up'

export default (dbConnection as Sequelize)
