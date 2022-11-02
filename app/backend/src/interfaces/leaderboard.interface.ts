export interface leaderBoardInterface {
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor:number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number | string,
}

export interface leaderBoardMethods {
  leaderBoardHome(): Promise<leaderBoardInterface[] | void>
}
