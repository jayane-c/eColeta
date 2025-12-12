import { Router } from "express";
import { MoradorController } from "../controllers/MoradorController";

const router = Router();
const moradorController = new MoradorController(); // Instância do Controller

// [READ] Rota GET /api/v1/morador/perfil (Buscar dados do Morador logado)
router.get('/perfil', moradorController.getProfile);

// [UPDATE] Rota PUT /api/v1/morador/perfil (Atualizar dados básicos)
router.put('/perfil', moradorController.updateProfile);

// [DELETE] Rota DELETE /api/v1/morador/perfil (Deletar conta)
router.delete('/perfil', moradorController.deleteProfile);

export default router;