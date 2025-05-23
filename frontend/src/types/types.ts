export interface MatchType {
  id?: number;
  playerOneId: number;
  playerOneCfn: string;
  playerTwoId?: number;
  playerTwoCfn: string;
  characterOneId: number;
  characterOne: { name: string };
  characterTwoId?: number;
  characterTwo: { name: string };
  status?: string;
  creatorSocketId?: string;
  locale: string;
  minRank: { name: string; id: number };
  maxRank: { name: string; id: number };
}

export interface UserType {
  id: number;
  cfnName: string;
  rankId?: number;
  mainCharacterId?: number;
  locale: string;
}

export interface CharacterType {
  id: number;
  name: string;
}

export interface RankType {
  id: number;
  name: string;
}

export interface MatchAction {
  label: string;
  onClick: () => void;
  style?: 'notify' | 'applied' | 'primary' | 'decline' | 'accept';
}
