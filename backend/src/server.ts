import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { sequelize } from './models';
import { seedTables } from './seeders/seeders';
// import { seedCharacters } from './seeders/charactersSeeder';

import api from './routes/api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});
app.use('/api', api);

app.get('/api', (req, res) => {
  res.send('Welcome to TechCheck API!');
});

sequelize
  .authenticate()
  .then(() => console.log('Database connected ✅'))
  .catch((err) => console.error('DB connection error ❌', err));

sequelize
  .sync({ alter: true, logging: false })
  .then(async () => {
    console.log('db synced');
    await seedTables();
  })
  .catch((err) => console.error('db sync error', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
