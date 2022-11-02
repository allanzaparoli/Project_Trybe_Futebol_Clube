import { Request, Response } from 'express';
import { methodMatchInterface } from '../interfaces/matches.interface';

export default class MatchesController {
  constructor(private service: methodMatchInterface) {
    this.service = service;
  }

  public getAll = async (req: Request, res: Response) => {
    if (req.query.inProgress) {
      const result = (req.query.inProgress === 'true');
      const results = await this.service.inProgress(result);
      return res.status(200).json(results);
    }
    const result = await this.service.getAll();
    return res.status(200).json(result);
  };

  public save = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const match: any = {
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    };
    const result = await this.service.save(match);
    return res.status(201).json(result);
  };

  public finish = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.service.finish(+id);
    return res.status(200).json({ message: 'Finished' });
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const match: any = {
      homeTeamGoals,
      awayTeamGoals,
    };
    await this.service.update(+id, match);
    return res.status(200).json({ message: 'Match info updated' });
  };
}
