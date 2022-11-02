import { Request, Response } from 'express';
import { leaderBoardMethods } from '../interfaces/leaderboard.interface';

export default class LeaderBoardController {
  constructor(private service: leaderBoardMethods) {
    this.service = service;
  }

  public leadBoardHome = async (req: Request, res: Response) => {
    const leaderboard = await this.service.leaderBoardHome();
    return res.status(200).json(leaderboard);
  };
}
