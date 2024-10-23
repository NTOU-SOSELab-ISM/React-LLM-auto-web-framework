import React from 'react';

const TextDisplay = ({ text, userInput }) => {
  return (
    <div className="text-display">
      {text.split('').map((char, index) => {
        let color;
        if (index < userInput.length) {
          color = char === userInput[index] ? 'correct' : 'incorrect';
        }
        return (
          <span key={index} className={color}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default TextDisplay;
