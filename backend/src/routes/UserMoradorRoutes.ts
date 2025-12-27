import { Router } from "express";
import { MoradorController } from "../controllers/MoradorController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();
const moradorController = new MoradorController(); // Instância do Controller

// [READ] Rota GET /morador/perfil (Buscar dados do Morador logado)
router.get('/perfil', authMiddleware, moradorController.getProfile.bind(moradorController));

// [UPDATE] Rota PUT /morador/perfil (Atualizar dados básicos)
router.patch('/perfil', authMiddleware, moradorController.updateProfile.bind(moradorController));

// [DELETE] Rota DELETE /morador/perfil (Deletar conta)
router.delete('/perfil', authMiddleware, moradorController.deleteProfile.bind(moradorController));

export default router;