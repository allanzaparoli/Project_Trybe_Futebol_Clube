import { Router } from 'express';
import Repository from '../repository/login.repository';
import Controller from '../controllers/login.controller';
import Service from '../services/login.service';
import validateLogin from '../middlewares/login.middleware';
import validateToken from '../middlewares/token.middleware';

const loginRepository = new Repository();
const loginService = new Service(loginRepository);
const loginController = new Controller(loginService);

const router = Router();

router.post('/', validateLogin, loginController.login);
router.get('/validate', validateToken);

export default router;
