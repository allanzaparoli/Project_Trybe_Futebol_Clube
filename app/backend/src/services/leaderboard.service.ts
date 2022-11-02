import { leaderBoardInterface, leaderBoardMethods } from '../interfaces/leaderboard.interface';
import { matchesInterface } from '../interfaces/matches.interface';
import TeamRepository from '../repository/teams.repository';
import MatchRepository from '../repository/matches.repository';

const totalVictories = (matchesTeam: matchesInterface[]) => {
  const result = matchesTeam.reduce((acc: number, curr: matchesInterface) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  return result;
};

const totalDraws = (matchesTeam: matchesInterface[]) => {
  const result = matchesTeam.reduce((acc: number, curr: matchesInterface) => {
    if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  return result;
};

const totalLosses = (matchesTeam: matchesInterface[]) => {
  const result = matchesTeam.reduce((acc: number, curr: matchesInterface) => {
    if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  return result;
};

const goalsFavor = (matchesTeam: matchesInterface[]) => {
  const result = matchesTeam
    .reduce((acc: number, curr: matchesInterface) => acc + curr.homeTeamGoals, 0);

  return result;
};

const goalsOwn = (matchesTeam: matchesInterface[]) => {
  const result = matchesTeam
    .reduce((acc: number, curr: matchesInterface) => acc + curr.awayTeamGoals, 0);

  return result;
};

const totalPoints = (matchesTeam: matchesInterface[]) => {
  const result = matchesTeam.reduce((acc: number, curr: matchesInterface) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
    if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  return result;
};

const rankingOrder = (arrayLeaderboard: any) => {
  const result = arrayLeaderboard.sort((a: leaderBoardInterface, b: leaderBoardInterface) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;

    if (a.totalVictories > b.totalVictories) return -1;
    if (a.totalVictories < b.totalVictories) return 1;

    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;

    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;

    if (a.goalsOwn > b.goalsOwn) return -1;
    if (a.goalsOwn < b.goalsOwn) return 1;

    return 0;
  });

  return result;
};

const leaderBoardFactory = (team: string, matches: any) => ({
  name: team,
  totalPoints: totalPoints(matches),
  totalGames: matches.length,
  totalVictories: totalVictories(matches),
  totalDraws: totalDraws(matches),
  totalLosses: totalLosses(matches),
  goalsFavor: goalsFavor(matches),
  goalsOwn: goalsOwn(matches),
  goalsBalance: goalsFavor(matches) - goalsOwn(matches),
  efficiency: +(((totalPoints(matches) / (matches.length * 3)) * 100).toFixed(2)),
});

export default class LeaderBoardService implements leaderBoardMethods {
  public teamsModel = new TeamRepository();
  public matchesModel = new MatchRepository();

  async leaderBoardHome(): Promise<leaderBoardInterface[]> {
    const teams = await this.teamsModel.getAll();
    const teamArr = await Promise
      .all(teams.map(async (e: any) => {
        const matches = await this.matchesModel.finishedMatches(e.id);
        return { teamName: e.teamName, matches };
      }));

    const leaderBoardMap = teamArr.map(
      ({ teamName, matches }) => leaderBoardFactory(teamName, matches),
    );

    return rankingOrder(leaderBoardMap);
  }
}
