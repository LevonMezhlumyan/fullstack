import { Router } from "express";
import { CheckAuth } from "../middlewares/ChekAuth.js";
import ShipsController from "../controllers/ShipsController.js";
const router = new Router();

router.get("/", CheckAuth, ShipsController.getShip);
router.post("/", CheckAuth, ShipsController.addShip);
router.delete("/",CheckAuth, ShipsController.deleteShip);

export default router;
