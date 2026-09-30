import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* One route so App stays mounted when the game ID is added to the URL */}
        <Route path="/:gameId?" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);