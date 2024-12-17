import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface JoinGameProps {
  onJoin: (gameId: string) => void;
}

export function JoinGame({ onJoin }: JoinGameProps) {
  const [gameId, setGameId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameId.trim()) {
      onJoin(gameId.toUpperCase());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-xl border border-white/20">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Join Existing Game</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value.toUpperCase())}
            placeholder="Enter Game ID (e.g., ABC123)"
            maxLength={4}
            className="w-full px-4 py-2 pr-10 rounded-lg bg-white/20 border border-white/30 
                     text-white placeholder-white/50 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent"
            required
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                   py-3 px-4 rounded-lg hover:from-blue-500 hover:to-purple-500 
                   transition-all duration-200 font-medium shadow-lg 
                   hover:shadow-blue-500/25 active:scale-95"
        >
          Join Game
        </button>
      </form>
    </div>
  );
}