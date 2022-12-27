import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';

import authRoutes from './routes/auth.routes';

const app = express();

app.set('pkg', pkg);

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    author: app.get('pkg').author,
    name: app.get('pkg').name,
    description: app.get('pkg').description,
    version: app.get('pkg').version,
  });
});

app.use('/api/auth', authRoutes);

export default app;
