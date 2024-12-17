export interface SoundConfig {
  src: string;
  volume: number;
}

export type SoundType = 
  | 'click' 
  | 'bidLow' 
  | 'bidMedium' 
  | 'bidHigh'
  | 'success' 
  | 'fail' 
  | 'roundComplete' 
  | 'victory';