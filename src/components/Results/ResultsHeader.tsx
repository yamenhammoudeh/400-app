import React from 'react';

interface ResultsHeaderProps {
  roundNumber: number;
}

export function ResultsHeader({ roundNumber }: ResultsHeaderProps) {
  return (
    <div className="text-center space-y-2">
      <h2 className="text-3xl font-bold text-gray-800">Round {roundNumber}</h2>
      <p className="text-lg text-gray-600">Confirm Results</p>
    </div>
  );
}