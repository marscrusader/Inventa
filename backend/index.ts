import express, { Application } from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import logger from './logger';
import sequelize from './database'


// Set up env
dotenv.config()
const port = process.env.SERVER_PORT

// Boot express
const app: Application = express();

// Cors, any because https://stackoverflow.com/a/59186658
app.use(cors() as any)

// Parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/', (req, res, next) => res.status(200).send({ hello: 'robot' }))

// Start server
app.listen(port, () => logger.debug(`Server is listening on port ${port}!`));

// Make sure db is connected
sequelize
  .authenticate()
  .then(() => {
    logger.debug('DB connection has been established successfully.');
  })
  .catch(err => {
    logger.error('Unable to connect to the database:', err);
  });
