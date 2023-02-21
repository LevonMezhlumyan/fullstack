import {Router} from 'express'
import { CheckAuth } from '../middlewares/ChekAuth.js';
import LikesController from '../controllers/LikesController.js';

const router = new Router();

router.get("/", CheckAuth, LikesController.getLikes)
router.post("/", CheckAuth, LikesController.addLike)
router.delete("/", CheckAuth, LikesController.deleteLike)

export default router;