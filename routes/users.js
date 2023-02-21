import {Router} from 'express'
import UserController from '../controllers/UserController.js';
import { CheckAuth } from '../middlewares/ChekAuth.js';

const router = new Router();

router.get('/find/:userId', CheckAuth, UserController.getUser)
router.put('/', CheckAuth, UserController.updateUser)

export default router;