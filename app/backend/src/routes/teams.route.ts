import { Router } from 'express';
import Repository from '../repository/teams.repository';
import TeamsService from '../services/teams.service';
import TeamsController from '../controllers/teams.controller';

const teamsRepository = new Repository();
const teamsService = new TeamsService(teamsRepository);
const teamsController = new TeamsController(teamsService);

const router = Router();

router.get('/', teamsController.getAll);
router.get('/:id', teamsController.getById);

export default router;
