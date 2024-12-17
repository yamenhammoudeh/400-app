import React, { useState } from 'react';
import { DeveloperInfoModal } from './DeveloperInfo';

export function Footer() {
  const [showDevInfo, setShowDevInfo] = useState(false);

  return (
    <>
      <footer className="fixed bottom-2 left-0 right-0 text-center text-white/40 text-xs">
        Developed by{' '}
        <button
          onClick={() => setShowDevInfo(true)}
          className="hover:text-white/60 transition-colors underline"
        >
          Yamen Hammoudeh
        </button>
      </footer>

      <DeveloperInfoModal
        isOpen={showDevInfo}
        onClose={() => setShowDevInfo(false)}
      />
    </>
  );
}