import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface BidInputProps {
  playerId: number;
  playerName: string;
  onBidSubmit: (playerId: number, bid: number) => void;
}

export function BidInput({ playerId, playerName, onBidSubmit }: BidInputProps) {
  const [bid, setBid] = useState(0);

  const handleBidChange = (newBid: number) => {
    if (newBid >= 0 && newBid <= 27) {
      setBid(newBid);
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
      <span className="font-medium min-w-[120px]">{playerName}</span>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleBidChange(bid - 1)}
          className="p-1 rounded hover:bg-gray-100"
          disabled={bid <= 0}
        >
          <ChevronDown className="w-5 h-5" />
        </button>
        <input
          type="number"
          value={bid}
          onChange={(e) => handleBidChange(parseInt(e.target.value) || 0)}
          className="w-16 text-center p-2 border rounded"
          min="0"
          max="27"
        />
        <button
          onClick={() => handleBidChange(bid + 1)}
          className="p-1 rounded hover:bg-gray-100"
          disabled={bid >= 27}
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>
      <button
        onClick={() => onBidSubmit(playerId, bid)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
}