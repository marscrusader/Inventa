import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import logger from './logger';
import sequelize from './database'
import userRoutes from './routes/user'
import collectionRoutes from './routes/collection'

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
app.use('/user', userRoutes)
app.use('/collection', collectionRoutes)

// Global unauthorized error handling
app.use((err, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    res.status(err.status).send({ message: err.message })
    logger.error(err)
    return
  }
  next()
});

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
