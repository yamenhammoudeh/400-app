import React, { useState } from 'react';
import { UserCircle2 } from 'lucide-react';
import { NameAutocomplete } from './NameAutocomplete';
import { playSound } from '../utils/sounds';

interface PlayerSetupProps {
  onPlayersSubmit: (players: string[]) => void;
}

export function PlayerSetup({ onPlayersSubmit }: PlayerSetupProps) {
  const [players, setPlayers] = useState(['', '', '', '']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (players.every(name => name.trim())) {
      playSound.success();
      onPlayersSubmit(players);
    }
  };

  const handlePlayerNameChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-xl border border-white/20">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">New Game</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {players.map((name, index) => (
          <div key={index} className="flex items-center space-x-3">
            <UserCircle2 className="w-6 h-6 text-white/70 flex-shrink-0" />
            <NameAutocomplete
              value={name}
              onChange={(value) => handlePlayerNameChange(index, value)}
              placeholder={`Player ${index + 1} name`}
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                   py-3 px-4 rounded-lg hover:from-blue-500 hover:to-purple-500 
                   transition-all duration-200 font-bold shadow-lg 
                   hover:shadow-blue-500/25 active:scale-95"
        >
          Start Game
        </button>
      </form>
    </div>
  );
}