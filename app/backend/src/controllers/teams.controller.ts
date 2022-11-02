import { Request, Response } from 'express';
import { Iteamm } from '../interfaces/teams.interface';

export default class TeamController {
  constructor(private service: Iteamm) {
    this.service = service;
  }

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.service.getAll();
    return res.status(200).json(result);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.service.getById(+id);
    return res.status(200).json(result);
  };
}
