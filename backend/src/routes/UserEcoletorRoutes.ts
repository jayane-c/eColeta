import { Router } from "express";
import { EcoletorController } from "../controllers/EcoletorController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();
const ecoletorController = new EcoletorController();


router.get('/perfil', authMiddleware, ecoletorController.getProfile.bind(ecoletorController));

router.patch('/perfil', authMiddleware, ecoletorController.updateProfile.bind(ecoletorController));

router.delete('/perfil', authMiddleware, ecoletorController.deleteProfile.bind(ecoletorController));

export default router;