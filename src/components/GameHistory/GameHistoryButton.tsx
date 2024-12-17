import React from 'react';
import { History } from 'lucide-react';

interface GameHistoryButtonProps {
  onClick: () => void;
}

export function GameHistoryButton({ onClick }: GameHistoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      aria-label="Show game history"
    >
      <History className="w-6 h-6" />
    </button>
  );
}