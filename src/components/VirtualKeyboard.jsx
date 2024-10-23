import React from 'react';

const keys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const VirtualKeyboard = ({ pressedKey }) => {
  return (
    <div className="keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <span 
              key={key} 
              className={`key ${pressedKey === key.toLowerCase() ? 'active' : ''}`}
            >
              {key}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
