import express, { json } from 'express';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';

import routes from './routes';

// inits
const app = express();

// settings
app.use('/uploads', express.static(path.resolve('uploads')));
app.set('port', process.env.PORT || 5000);

// middlewares
app.use(logger('dev'));
app.use(json());
app.use(cors({
    origin: 'http://localhost:3001'
}));

// routes
app.use('/api', routes);

export default app;