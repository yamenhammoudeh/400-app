import React, { useState } from 'react';
import { Check, X, Gamepad2 } from 'lucide-react';
import { BidModal } from './BidModal';
import { playSound } from '../../utils/sounds';

interface BidGridProps {
  playerId: number;
  playerName: string;
  onBidSelect: (bid: number) => void;
  selectedBid?: number;
  disabled?: boolean;
}

export function BidGrid({ playerId, playerName, onBidSelect, selectedBid, disabled }: BidGridProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      playSound.click();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div 
        onClick={handleClick}
        className={`
          card space-y-4 cursor-pointer hover:bg-white/15 transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          max-h-[150px] flex flex-col justify-between
        `}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{playerName}</h3>
          {selectedBid !== undefined && (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-2xl text-green-400 font-bold">
                <Check className="w-5 h-5" />
                {selectedBid}
              </span>
              {!disabled && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playSound.click();
                    onBidSelect(0);
                  }}
                  className="p-1 rounded-full hover:bg-red-500/20 text-red-400 transition-colors"
                  title="Clear selection"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
        
        {!selectedBid && (
          <div className="text-center py-4 text-white/80 flex items-center justify-center gap-2">
            <Gamepad2 className="w-5 h-5 animate-bounce" />
            <span>Tap to select bid</span>
          </div>
        )}
      </div>

      <BidModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        playerName={playerName}
        onBidSelect={onBidSelect}
        selectedBid={selectedBid}
      />
    </>
  );
}