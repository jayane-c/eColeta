import express from 'express';
import { initializeDatabase } from './config/database';
import authRoutes from './routes/AuthRoutes';
import userMoradorRoutes from './routes/UserMoradorRoutes';

// Middleware para parsear JSON
const app = express();
app.use(express.json());

// Rotas de autenticação
app.use('/api/v1/auth', authRoutes);
// Rotas do morador
app.use('/api/v1/morador', userMoradorRoutes);

// Iniciar o servidor após conectar ao banco de dados

initializeDatabase()
.catch((error) => console.error('Erro ao conectar ao banco de dados:', error));

app.listen(3000, () => console.log('Servidor rodando na porta 3000.'))