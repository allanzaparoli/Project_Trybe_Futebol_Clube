import { Router } from 'express';
import Controller from '../controllers/leaderboard.controller';
import Service from '../services/leaderboard.service';

const leaderBoardService = new Service();
const LeaderBoardController = new Controller(leaderBoardService);

const router = Router();

router.get('/home', LeaderBoardController.leadBoardHome);

export default router;
