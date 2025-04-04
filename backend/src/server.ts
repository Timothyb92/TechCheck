import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { sequelize } from './models';
import { seedTables } from './seeders/seeders';
import { setupAssociations } from './models/associations';

import api from './routes/api';
import auth from './routes/auth';

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

app.use('/api', api);
app.use('/auth', auth);

app.get('/api', (req, res) => {
  res.send('Welcome to TechCheck API!');
});

setupAssociations();

sequelize
  .sync({ force: true, logging: false })
  .then(async () => {
    seedTables();
  })
  .catch((err) => console.error('db sync error', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
