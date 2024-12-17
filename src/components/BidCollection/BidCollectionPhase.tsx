import React from 'react';
import { BidGrid } from './BidGrid';
import { Player } from '../../types/game';

interface BidCollectionPhaseProps {
  players: Player[];
  currentBids: Map<number, number>;
  onBidChange: (playerId: number, bid: number) => void;
  onConfirmBids: () => void;
}

export function BidCollectionPhase({
  players,
  currentBids,
  onBidChange,
  onConfirmBids,
}: BidCollectionPhaseProps) {
  const allBidsSubmitted = players.every(player => 
    currentBids.has(player.id) && currentBids.get(player.id)! > 0
  );
  
  const totalBids = Array.from(currentBids.values()).reduce((sum, bid) => sum + bid, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {players.map((player) => (
          <BidGrid
            key={player.id}
            playerId={player.id}
            playerName={player.name}
            onBidSelect={(bid) => onBidChange(player.id, bid)}
            selectedBid={currentBids.get(player.id)}
          />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
        <div className="max-w-md mx-auto space-y-2">
          <p className="text-center text-white/70">
            Total bids: {totalBids}
          </p>
          <button
            onClick={onConfirmBids}
            disabled={!allBidsSubmitted}
            className={`
              w-full py-3 px-6 rounded-xl font-medium transition-all duration-200
              ${allBidsSubmitted 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500' 
                : 'bg-gray-800/50 text-white/50 cursor-not-allowed'}
            `}
          >
            {allBidsSubmitted ? 'Confirm Bids' : 'Select bids for all players'}
          </button>
        </div>
      </div>
    </div>
  );
}