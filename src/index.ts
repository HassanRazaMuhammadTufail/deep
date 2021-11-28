import 'reflect-metadata';
import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import routes from './modules/inventory/routes';
import { connect } from './db/db';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger';
import './crons';

connect();
const app: express.Application = express();

// Call midlewares
app.use(cors());
app.use(helmet());

const jsonMiddleware = json({ limit: '10mb', inflate: true });
app.use((req, res, next) => {
  jsonMiddleware(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        status: 400,
        message: 'Invalid JSON or request too large',
      });
    } else {
      next();
    }
  });
});

app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(
  // use port 300 if not defined in environment
  // for production port s defined, else 3000 for local development
  process.env.PORT ? process.env.PORT : 3000,
  () => {
    console.log('Listening on requested port');
  },
);

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });
