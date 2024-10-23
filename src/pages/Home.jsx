import React, { useState } from 'react';
import TextInput from '../components/TextInput';
import VirtualKeyboard from '../components/VirtualKeyboard';
import TextDisplay from '../components/TextDisplay';
import Timer from '../components/Timer';

const generateRandomText = () => {
  const texts = [
    'This is a random typing text.',
    'React makes front-end development easier.',
    'JavaScript is a versatile language.',
    'Coding can be fun and challenging.'
  ];
  return texts[Math.floor(Math.random() * texts.length)];
};

const Home = () => {
  const [text, setText] = useState(generateRandomText());
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [wpm, setWpm] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [customText, setCustomText] = useState('');

  const handleTextInput = (input) => {
    if (!isTyping) {
      setIsTyping(true);
      setStartTime(new Date().getTime());
    }
    setUserInput(input);
    if (input === text) {
      const elapsedTime = (new Date().getTime() - startTime) / 1000.0 / 60.0; // in minutes
      const wordsTyped = input.split(' ').length;
      console.log(wordsTyped);
      console.log(elapsedTime);
      setWpm((wordsTyped / elapsedTime).toFixed(2));
      setIsTyping(false);
    }
  };

  const handleTimerEnd = () => {
    const wordsTyped = userInput.split(' ').length;
    const elapsedTime = (new Date().getTime() - startTime) / 1000.0 / 60.0; // in minutes
    setWpm((wordsTyped / elapsedTime).toFixed(2));
    setIsTyping(false);
  };

  const handleTextChange = () => {
    setText(generateRandomText());
    setUserInput('');
    setWpm(null);
    setIsTyping(false);
  };

  const handleAddText = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleTextSubmit = () => {
    setText(customText);
    setUserInput('');
    setWpm(null);
    setIsTyping(false);
    setShowModal(false);
  };

  return (
    <div className="home">
      <h1>Typing Practice</h1>
      {wpm ? <div className="wpm">WPM: {wpm}</div> : <Timer start={isTyping} onTimerEnd={handleTimerEnd} />}
      <TextDisplay text={text} userInput={userInput} />
      <TextInput text={text} onTextInput={handleTextInput} />
      <VirtualKeyboard pressedKey={userInput.slice(-1)} />
      <button onClick={handleTextChange}>Generate New Text</button>
      <button className="add-text-button" onClick={handleAddText}>Add Custom Text</button>
      
      {showModal && (
        <div className="text-modal">
          <div className="modal-content">
            <h3>Add Custom Text</h3>
            <textarea 
              rows="5" 
              cols="50" 
              value={customText} 
              onChange={(e) => setCustomText(e.target.value)} 
              placeholder="Enter custom text here..."
            />
            <div className="modal-buttons">
              <button className="modal-button" onClick={handleTextSubmit}>Submit</button>
              <button className="modal-button" onClick={handleModalClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
