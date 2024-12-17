import React from 'react';
import { QrCode } from 'lucide-react';

interface QRCodeButtonProps {
  onClick: () => void;
}

export function QRCodeButton({ onClick }: QRCodeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      aria-label="Show QR code"
    >
      <QrCode className="w-6 h-6" />
    </button>
  );
}