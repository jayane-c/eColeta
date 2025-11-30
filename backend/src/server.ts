import express from 'express';
import { initializeDatabase } from './config/database';

const app = express();

initializeDatabase()
.catch((error) => console.error('Erro ao conectar ao banco de dados:', error));

app.listen(3000, () => console.log('Servidor rodando na porta 3000.'))