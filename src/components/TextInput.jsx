import React, { useState, useEffect } from 'react';

const TextInput = ({ text, onTextInput }) => {
  const [input, setInput] = useState('');
  
  useEffect(() => {
    onTextInput(input);
  }, [input]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <input 
      type="text"
      value={input}
      onChange={handleChange}
      placeholder="Start typing here..."
      className="text-input"
    />
  );
};

export default TextInput;
