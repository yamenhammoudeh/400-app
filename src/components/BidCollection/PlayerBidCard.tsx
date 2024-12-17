import React from 'react';
import { UserCircle2, Check } from 'lucide-react';
import { BidSlider } from './BidSlider';

interface PlayerBidCardProps {
  playerId: number;
  playerName: string;
  currentBid: number | undefined;
  onBidChange: (bid: number) => void;
  isConfirmed: boolean;
}

export function PlayerBidCard({
  playerId,
  playerName,
  currentBid,
  onBidChange,
  isConfirmed,
}: PlayerBidCardProps) {
  return (
    <div className={`p-4 rounded-lg shadow-md bg-white ${isConfirmed ? 'bg-gray-50' : ''}`}>
      <div className="flex items-center space-x-3 mb-4">
        <UserCircle2 className="w-6 h-6 text-gray-400" />
        <span className="font-medium">{playerName}</span>
        {isConfirmed && <Check className="w-5 h-5 text-green-500" />}
      </div>
      
      <BidSlider
        value={currentBid ?? 0}
        onChange={onBidChange}
        disabled={isConfirmed}
      />
    </div>
  );
}