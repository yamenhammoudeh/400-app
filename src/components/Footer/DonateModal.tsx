import React from 'react';
import { Heart } from 'lucide-react';
import { playSound } from '../../utils/sounds';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DonateModal({ isOpen, onClose }: DonateModalProps) {
  if (!isOpen) return null;

  const handleDonate = () => {
    window.open('https://www.paypal.com/donate/?business=mr.yamen@gmail.com&amount=10&currency_code=USD', '_blank');
    playSound.success();
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
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
        <div className="p-6 space-y-4">
          <div className="text-center">
            <Heart className="w-12 h-12 text-red-500 mx-auto animate-pulse" />
            <h2 className="text-2xl font-bold text-gray-800 mt-4">Support This Project</h2>
          </div>
          
          <p className="text-gray-600 text-center">
            If you're enjoying the 400 Card Game, consider buying me a coffee! Your support helps me create more awesome games and keep them free for everyone.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleDonate}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-200 transform hover:scale-105"
            >
              Donate $10 via PayPal
            </button>
            
            <button
              onClick={handleClose}
              className="w-full px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}