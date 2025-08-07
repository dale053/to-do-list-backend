import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo.routes';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (_req, res) => {
  res.send('API is running');
});

export default app;
