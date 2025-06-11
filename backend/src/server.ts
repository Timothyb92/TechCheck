import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';

import { sequelize } from './models';
import { seedTables } from './seeders/seeders';
import { setupAssociations } from './models/associations';

import { ServerSocket } from './sockets';

import api from './routes/api';
import authRouter from './auth/auth.routes';

dotenv.config({ path: path.resolve(__dirname, '/backend/.env') });

const app = express();
const httpServer = http.createServer(app);
const PORT: number = Number(process.env.PORT) || 8000;
const isDev = process.env.NODE_ENV === 'development';

new ServerSocket(httpServer);

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://www.techcheck.gg'
        : process.env.CLIENT_BASE_URL,
    credentials: true,
  })
);

app.use(express.json());

if (isDev) {
  app.use((req, res, next) => {
    console.info(`[${req.method}] ${req.path}`);
    next();
  });
}

app.use(cookieParser());
app.use('/api', api);
app.use('/api/auth', authRouter);

setupAssociations();

sequelize
  .sync({ force: isDev })
  .then(async () => {
    seedTables();
  })
  .catch((err) => console.error('db sync error', err));

httpServer.listen(PORT, '0.0.0.0', () => {
  console.info(`Server running on port ${PORT}`);
});
