export interface MatchType {
  id?: number;
  playerOneId: number;
  playerOneCfn: string;
  playerTwoId?: number;
  playerTwoCfn: string;
  characterOneId: number;
  characterTwoId?: number;
  status?: string;
  creatorSocketId?: string;
}
