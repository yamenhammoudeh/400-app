import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { DonateModal } from './DonateModal';

export function DonateButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-36 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 transition-colors"
        aria-label="Donate"
      >
        <Heart className="w-6 h-6" />
      </button>
      
      <DonateModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}