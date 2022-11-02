import { Iteamm, Iteam } from '../interfaces/teams.interface';
import ErrorHandler from '../utils/errorHandler.utils';

require('express-async-errors');

export default class TeamsService implements Iteamm {
  constructor(private model: Iteamm) {
    this.model = model;
  }

  async getAll(): Promise<Iteam[]> {
    const results = await this.model.getAll();
    return results;
  }

  async getById(id: number): Promise<Iteam | null> {
    const result = await this.model.getById(id);
    if (!result) throw new ErrorHandler(404, 'There is no team with such id!');
    return result;
  }
}
