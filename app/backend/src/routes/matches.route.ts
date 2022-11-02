import { Router } from 'express';
import Repository from '../repository/matches.repository';
import Service from '../services/matches.service';
import Controller from '../controllers/matches.controller';
import validmatchMiddleware from '../middlewares/match.middlewares';

const matchRepository = new Repository();
const matchService = new Service(matchRepository);
const matchController = new Controller(matchService);

const router = Router();

router.get('/', matchController.getAll);
router.post('/', validmatchMiddleware, matchController.save);
router.patch('/:id/finish', matchController.finish);
router.patch('/:id', matchController.update);

export default router;
