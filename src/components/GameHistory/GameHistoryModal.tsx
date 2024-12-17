import React from 'react';
import { X } from 'lucide-react';
import { GameHistoryTable } from './GameHistoryTable';
import { Player, Round } from '../../types/game';

interface GameHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  rounds: Round[];
}

export function GameHistoryModal({ isOpen, onClose, players, rounds }: GameHistoryModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden text-white">
        <div className="p-4 border-b border-white/10 flex justify-between items-center sticky top-0 bg-gray-900">
          <h2 className="text-xl font-bold">Game History</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close history"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 overflow-auto max-h-[calc(80vh-4rem)]">
          <GameHistoryTable players={players} rounds={rounds} />
        </div>
      </div>
    </div>
  );
}