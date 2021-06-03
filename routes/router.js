import { Router } from "express";
import controller from "../controllers/controller.js";

const router = Router();
router.get('/api/results', controller.getResults);
router.post("/api/result", controller.addResult);
// router.put('/api/result',controller.updateResult);
router.delete('/api/result' , controller.deleteResults);

export default router;
