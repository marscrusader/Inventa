import sequelize, { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()
let dbConnection: Sequelize | null = null
if (process.env.NODE_ENV === 'production') {
  if (process.env.DATABASE_URL) {
    dbConnection = new sequelize.Sequelize(
      process.env.DATABASE_URL,
      {
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      }
    );
  }
} else {
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
}
if (!dbConnection) throw 'Database is not set up'

export default (dbConnection as Sequelize)
