import { Iteamm } from './teams.interface';

export interface matchesInterface {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: Iteamm;
  teamAway: Iteamm;
}

export interface saveMatchInterface {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface updateMatchInterface {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface methodMatchInterface {
  getAll(): any;
  inProgress(progress: boolean): any;
  save(match: matchesInterface): any;
  finish(id: number): any;
  findAndCountById(id: number[]): any;
  update(id: number, match: updateMatchInterface): any;
}
