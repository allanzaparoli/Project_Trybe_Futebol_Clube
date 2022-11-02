import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

import {
  methodMatchInterface, saveMatchInterface, updateMatchInterface,
} from '../interfaces/matches.interface';

export default class matchRepository implements methodMatchInterface {
  constructor(private model = Matches) {
    this.model = model;
  }

  getAll = async () => {
    const results = await this.model.findAll({ include: [
      { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    return results;
  };

  inProgress = async (progress: boolean) => {
    const result = await this.model.findAll({ where: { inProgress: progress },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    return result;
  };

  save = async (match: saveMatchInterface) => {
    const result = await this.model.create(match);
    return result;
  };

  finishedMatches = async (id: number) => {
    const result = await this.model.findAll({ where: { inProgress: false, homeTeam: id },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    return result;
  };

  finish = async (id: number) => {
    const result = await this.model.update({ inProgress: false }, { where: { id } });
    return result;
  };

  findAndCountById = async (id: number[]) => {
    const result = await this.model.findAndCountAll({ where: { id } });
    return result;
  };

  update = async (id: number, match: updateMatchInterface) => {
    const result = await this.model.update(match, { where: { id } });
    return result;
  };
}
