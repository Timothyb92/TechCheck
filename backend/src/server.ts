import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import { sequelize } from './models';
import { seedTables } from './seeders/seeders';
import { setupAssociations } from './models/associations';

import { ServerSocket } from './sockets';

import api from './routes/api';
import auth from './routes/auth';

dotenv.config({ path: path.resolve(__dirname, '/backend/.env') });

const app = express();
const httpServer = http.createServer(app);
const PORT: number = Number(process.env.PORT) || 8000;

new ServerSocket(httpServer);

app.use(cors());
app.use(express.json());
// app.use((req, res, next) => {
//   console.info(`[${req.method}] ${req.path}`);
//   next();
// });

app.use('/api', api);
app.use('/auth', auth);

setupAssociations();

sequelize
  .sync({ force: true, logging: false })
  .then(async () => {
    seedTables();
  })
  .catch((err) => console.error('db sync error', err));

httpServer.listen(PORT, '0.0.0.0', () => {
  console.info(`Server running on port ${PORT}`);
});
