import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Share2, Copy } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: string;
  gameUrl: string;
}

export function QRCodeModal({ isOpen, onClose, gameId, gameUrl }: QRCodeModalProps) {
  if (!isOpen) return null;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(gameUrl);
      alert('Game URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: '400 Card Game',
        text: `Join my game of 400! Game ID: ${gameId}`,
        url: gameUrl
      });
    } catch (err) {
      console.error('Failed to share:', err);
      handleCopyUrl();
    }
  };

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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-600">
          <h2 className="text-xl font-bold text-white">Share Game</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex justify-center">
            <QRCodeSVG
              value={gameUrl}
              size={200}
              level="H"
              includeMargin
              className="border p-2 rounded bg-white"
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-center font-bold text-gray-800">Game ID: {gameId}</p>
            <p className="text-center text-sm text-gray-600">
              Scan the QR code or share the link below
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              onClick={handleShare}
              className="flex items-center justify-center space-x-2 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Share2 className="w-5 h-5" />
              <span>Share Game</span>
            </button>
            
            <button
              onClick={handleCopyUrl}
              className="flex items-center justify-center space-x-2 w-full border border-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
            >
              <Copy className="w-5 h-5" />
              <span className="text-gray-700">Copy Link</span>
            </button>

            <button
              onClick={onClose}
              className="flex items-center justify-center space-x-2 w-full border border-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
            >
              <X className="w-5 h-5" />
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}