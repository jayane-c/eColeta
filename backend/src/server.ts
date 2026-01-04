import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './config/database';
import authRoutes from './routes/AuthRoutes';
import userMoradorRoutes from './routes/UserMoradorRoutes';
import ResiduoRoutes from "./routes/ResiduoRoutes";
import { coletaRoutes } from './routes/ColetaRoutes';

// Middleware para parsear JSON
const app = express();
app.use(express.json());

// cors
app.use(cors());

// Rotas de autenticação
app.use('/auth', authRoutes);
// Rotas do morador
app.use('/morador', userMoradorRoutes);
// Rotas para coletas
app.use("/coletas", coletaRoutes);
// Rota para listar residuo
app.use('/residuos', ResiduoRoutes);

// Iniciar o servidor após conectar ao banco de dados

initializeDatabase()
.catch((error) => console.error('Erro ao conectar ao banco de dados:', error));

app.listen(3000, () => console.log('Servidor rodando na porta 3000.'))