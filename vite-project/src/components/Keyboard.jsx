import { useEffect, useState } from 'react';
import '../styles/Keyboard.css';

function Keyboard({ isDarkMode, activeKey }) {
  const keys = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <div className="keyboard">
      {keys.map((key, idx) => (
        <div
          key={idx}
          className={`key ${key === activeKey ? 'active' : ''} ${isDarkMode ? 'dark' : 'light'}`}
        >
          {key.toUpperCase()}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
