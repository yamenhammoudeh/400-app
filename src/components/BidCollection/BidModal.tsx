import React from 'react';
import { X } from 'lucide-react';
import { ALLOWED_BIDS } from '../../constants/game';
import { playSound } from '../../utils/sounds';

interface BidModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  onBidSelect: (bid: number) => void;
  selectedBid?: number;
}

export function BidModal({ isOpen, onClose, playerName, onBidSelect, selectedBid }: BidModalProps) {
  if (!isOpen) return null;

  const handleBidSelect = (bid: number) => {
    playSound.bid(bid);
    onBidSelect(bid);
    onClose();
  };

  const handleClose = () => {
    playSound.click();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl w-full max-w-md transform transition-all">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl">
          <h3 className="text-xl font-bold text-white">
            {playerName}'s Bid
          </h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-3">
            {ALLOWED_BIDS.map((bid) => (
              <button
                key={bid}
                onClick={() => handleBidSelect(bid)}
                className={`
                  py-6 rounded-xl font-bold text-2xl transition-all duration-200
                  ${selectedBid === bid 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105' 
                    : 'bg-white/10 hover:bg-white/20 text-white'}
                  hover:scale-105 active:scale-95
                `}
              >
                {bid}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}