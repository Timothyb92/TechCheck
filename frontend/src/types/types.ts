export interface MatchType {
  id?: string;
  status: string;
  applicantCharId?: number;
  characterTwoId: number;
  minRank: { name: string; id: number };
  maxRank: { name: string; id: number };
  playerOne: {
    id: number;
    rankId: number;
    mainCharacterid: number;
    cfnName: string;
    canApplyjoin: boolean;
    locale: string;
    userCode: string;
    Character: {
      id: number;
      name: string;
    };
  };
  playerTwo?: {
    id: number;
    rankId: number;
    mainCharacterid: number;
    cfnName: string;
    canApplyjoin: boolean;
    locale: string;
    userCode: string;
    Character: {
      id: number;
      name: string;
    };
  };
}

export interface UserType {
  id: number;
  cfnName?: string;
  userCode?: string;
  rankId: number;
  mainCharacterId: number | undefined;
  locale: string;
  matchesCreated?: { status: string }[];
  matchesJoined?: { status: string }[];
  canApplyJoin?: boolean;
  isAuth?: boolean;
  Rank?: {
    id: number;
    name: string;
  };
  Character?: {
    id: number;
    name: string;
  };
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
  style?: string;
  variant: string;
  tooltip?: string;
}
