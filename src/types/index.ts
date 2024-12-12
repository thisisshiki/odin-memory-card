export interface Card {
  id: string;
  name: string;
  imageUrl: string;
  selected: boolean;
}

export interface ScoreState {
  currentScore: number;
  bestScore: number;
}