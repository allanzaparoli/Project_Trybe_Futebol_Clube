import { methodMatchInterface, matchesInterface } from '../interfaces/matches.interface';
import ErrorHandler from '../utils/errorHandler.utils';

export default class MatchesService implements methodMatchInterface {
  constructor(private model: methodMatchInterface) {
    this.model = model;
  }

  async getAll(): Promise<matchesInterface[]> {
    const result = await this.model.getAll();
    return result;
  }

  async inProgress(progress: boolean): Promise<matchesInterface[]> {
    const result = await this.model.inProgress(progress);
    return result;
  }

  async findAndCountById(id: number[]):
  Promise<{ count: number, rows: matchesInterface[] }> {
    const result = await this.model.findAndCountById(id);
    if (result.count < 2) throw new ErrorHandler(404, 'There is no team with such id!');
    return result;
  }

  async save(match: matchesInterface): Promise<matchesInterface> {
    const { homeTeam, awayTeam } = match;
    await this.findAndCountById([homeTeam, awayTeam]);
    const result = await this.model.save(match);
    return result;
  }

  async finish(id: number): Promise<matchesInterface> {
    const result = await this.model.finish(id);
    return result;
  }

  async update(id: number, match: matchesInterface): Promise<matchesInterface> {
    const result = await this.model.update(id, match);
    return result;
  }
}
