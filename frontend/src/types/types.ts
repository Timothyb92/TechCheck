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

export interface UserType {
  id: number;
  // username: string;
  cfnName?: string;
  rankId?: number;
  mainCharacterId?: number;
}
