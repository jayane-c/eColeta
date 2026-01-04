import { Router } from "express";
import { ColetaController } from "../controllers/ColetaController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

import { onlyMorador, onlyWorkers } from "../middlewares/RoleMiddleware";

const router = Router();
const coletaController = new ColetaController();

// [POST] /coletas - Criar nova solicitação de coleta (apenas moradores)
// URL Final: POST http://localhost:3000/coletas
router.post(
    "/", 
    authMiddleware, 
    onlyMorador, 
    coletaController.create.bind(coletaController)
);

// [GET] Ver histórico pessoal
// URL Final: GET http://localhost:3000/coletas/meu-historico
router.get(
    "/meu-historico", 
    authMiddleware, 
    onlyMorador, 
    coletaController.listMine.bind(coletaController)
);


// Rotas para Ecoletor/Cooperativa
// [GET] Listar coletas disponíveis (Pendentes)
// URL Final: GET http://localhost:3000/coletas/disponiveis
router.get(
    "/disponiveis", 
    authMiddleware, 
    onlyWorkers, 
    coletaController.listAvailable.bind(coletaController)
);

export { router as coletaRoutes };