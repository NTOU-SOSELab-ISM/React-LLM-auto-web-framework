import { useState, useEffect, useRef } from 'react';
import Keyboard from '../components/Keyboard.jsx';
import '../styles/TypingArea.css';

function TypingArea({ customText, isDarkMode }) {
  const [text, setText] = useState(customText || 'This is a typing test. Type the following text.');
  const [input, setInput] = useState('');
  const [timer, setTimer] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [started, setStarted] = useState(false);
  const [activeKey, setActiveKey] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    setText(customText);
    resetTypingTest();
  }, [customText]);

  useEffect(() => {
    if (!started) return;
    if (timer > 0 && !isCompleted) {
      timerRef.current = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    } else {
      clearTimeout(timerRef.current);
      if (!isCompleted) calculateWpm();
    }
    return () => clearTimeout(timerRef.current);
  }, [timer, started, input]);

  const handleInputChange = (e) => {
    if (!started) {
      setStarted(true);
    }
    if (!isCompleted) {
      const value = e.target.value;
      const lastChar = value[value.length - 1];
      setInput(value);
      setActiveKey(lastChar.toLowerCase()); // 將最後一個輸入字母設置為activeKey
      if (value === text) {
        setIsCompleted(true);
        calculateWpm();
      }
    }
  };

  const calculateWpm = () => {
    const wordsTyped = input.trim().split(' ').length;
    setWpm(wordsTyped);
  };

  const resetTypingTest = () => {
    setInput('');
    setTimer(60);
    setWpm(0);
    setIsCompleted(false);
    setStarted(false);
    setActiveKey('');
  };

  return (
    <div className="typing-area">
      {!isCompleted && (
        <>
          <div className="timer">{timer}s</div>
          <div className="wpm">WPM: {wpm}</div>
          <div className={`text-display ${isDarkMode ? 'dark' : 'light'}`}>
            {text.split('').map((char, idx) => (
              <span
                key={idx}
                className={
                  idx < input.length
                    ? input[idx] === char
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }
              >
                {char}
              </span>
            ))}
          </div>
          <input
            type="text"
            className={`text-input ${isDarkMode ? 'dark' : 'light'}`}
            value={input}
            onChange={handleInputChange}
            disabled={isCompleted || timer === 0}
          />
        </>
      )}
      {isCompleted && (
        <div className="result-screen">
          <h2>Typing Test Completed!</h2>
          <p>Your WPM: {wpm}</p>
          <button onClick={resetTypingTest}>Restart</button>
        </div>
      )}
      <Keyboard isDarkMode={isDarkMode} activeKey={activeKey} />
    </div>
  );
}

export default TypingArea;
