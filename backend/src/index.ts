import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Welcome to TechCheck API!');
});

sequelize
  .authenticate()
  .then(() => console.log('Database connected ✅'))
  .catch((err) => console.error('DB connection error ❌', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
