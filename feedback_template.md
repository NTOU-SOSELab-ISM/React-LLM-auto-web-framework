以下為我目前的react專案程式碼，其中有以下錯誤:

### User feedback
* 我想要我的輸入框置中對齊
* 在Dark Mode下，無法看到鍵盤的即時回饋，幫我修正

以下為程式碼:

```jsx
// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TypingPage from './pages/TypingPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TypingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
```

```css
/* src/App.css */
#root {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

```jsx
// src/pages/TypingPage.jsx
import { useState, useCallback, useEffect } from 'react';
import Timer from '../components/Timer';
import TextDisplay from '../components/TextDisplay';
import InputArea from '../components/InputArea';
import Keyboard from '../components/Keyboard';
import ThemeToggle from '../components/ThemeToggle';
import TextModal from '../components/TextModal';
import '/src/styles/TypingPage.css';

const DEFAULT_TEXT = "The quick brown fox jumps over the lazy dog. Programming is both an art and a science. Practice makes perfect.";

const TypingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentText, setCurrentText] = useState(DEFAULT_TEXT);
  const [userInput, setUserInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [pressedKey, setPressedKey] = useState("");

  const calculateWPM = useCallback(() => {
    if (startTime && endTime) {
      const timeInMinutes = (endTime - startTime) / 1000 / 60;
      const wordsTyped = userInput.trim().split(/\s+/).length;
      return Math.round(wordsTyped / timeInMinutes);
    }
    return 0;
  }, [startTime, endTime, userInput]);

  const handleInputChange = useCallback((value) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setUserInput(value);
    
    if (value === currentText) {
      setEndTime(Date.now());
    }
  }, [currentText, startTime]);

  const handleKeyPress = useCallback((key) => {
    setPressedKey(key);
    setTimeout(() => setPressedKey(""), 200);
  }, []);

  const handleCustomTextSubmit = useCallback((text) => {
    setCurrentText(text);
    setUserInput("");
    setStartTime(null);
    setEndTime(null);
    setWpm(0);
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    if (endTime) {
      setWpm(calculateWPM());
    }
  }, [endTime, calculateWPM]);

  return (
    <div className={`typing-page ${isDarkMode ? 'dark' : 'light'}`}>
      <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
      <Timer startTime={startTime} endTime={endTime} wpm={wpm} />
      <button 
        className="custom-text-btn"
        onClick={() => setIsModalOpen(true)}
      >
        Add Custom Text
      </button>
      <TextDisplay text={currentText} userInput={userInput} />
      <InputArea 
        value={userInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <Keyboard pressedKey={pressedKey} />
      <TextModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCustomTextSubmit}
      />
    </div>
  );
};

export default TypingPage;
```

```jsx
// src/components/InputArea.jsx
import '/src/styles/InputArea.css';

const InputArea = ({ value, onChange, onKeyPress }) => {
  const handleKeyDown = (e) => {
    onKeyPress(e.key);
    onChange(e.target.value);
  };

  return (
    <textarea
      className="input-area"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Start typing here..."
    />
  );
};

export default InputArea;
```

```jsx
// src/components/Keyboard.jsx
import '/src/styles/Keyboard.css';

const Keyboard = ({ pressedKey }) => {
  const keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  return (
    <div className="keyboard">
      {keyboardLayout.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.map(key => (
            <div
              key={key}
              className={`key ${pressedKey.toLowerCase() === key ? 'active' : ''}`}
            >
              {key.toUpperCase()}
            </div>
          ))}
        </div>
      ))}
      <div className="keyboard-row">
        <div className={`key space ${pressedKey === ' ' ? 'active' : ''}`}>
          SPACE
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
```

```jsx
// src/components/TextDisplay.jsx
import '/src/styles/TextDisplay.css';

const TextDisplay = ({ text, userInput }) => {
  return (
    <div className="text-display">
      {text.split('').map((char, index) => {
        let className = 'char';
        if (index < userInput.length) {
          className += userInput[index] === char ? ' correct' : ' incorrect';
        }
        return <span key={index} className={className}>{char}</span>;
      })}
    </div>
  );
};

export default TextDisplay;
```

```jsx
// src/components/TextModal.jsx
import { useState } from 'react';
import '/src/styles/TextModal.css';

const TextModal = ({ isOpen, onClose, onSubmit }) => {
  const [customText, setCustomText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customText.trim()) {
      onSubmit(customText.trim());
      setCustomText("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Custom Text</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Enter your custom text here..."
          />
          <div className="modal-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TextModal;
```

```jsx
// src/components/ThemeToggle.jsx
import '/src/styles/ThemeToggle.css';

const ThemeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <button className="theme-toggle" onClick={onToggle}>
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
```

```jsx
import { useState, useEffect } from 'react';
import '/src/styles/Timer.css';

const Timer = ({ startTime, endTime, wpm }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (startTime && !endTime) {
      intervalId = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [startTime, endTime]);

  return (
    <div className="timer">
      <div className="time">Time: {elapsedTime}s</div>
      {endTime && <div className="wpm">WPM: {wpm}</div>}
    </div>
  );
};

export default Timer;
```

```css
  /* src/styles/InputArea.css */
  .input-area {
    width: 100%;
    max-width: 800px;
    height: 100px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 1.2rem;
    border: 2px solid #ccc;
    border-radius: 8px;
    resize: none;
  }
  
  .dark .input-area {
    background-color: #333;
    color: #fff;
    border-color: #666;
  }
```

```css
  /* src/styles/Keyboard.css */
  .keyboard {
    margin-top: 2rem;
    user-select: none;
  }
  
  .keyboard-row {
    display: flex;
    justify-content: center;
    margin: 5px 0;
  }
  
  .key {
    width: 40px;
    height: 40px;
    margin: 0 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .key.space {
    width: 200px;
  }
  
  .key.active {
    background-color: #4CAF50;
    color: white;
  }
  
  .dark .key {
    background-color: #333;
    border-color: #666;
    color: #fff;
  }
```

```css
  /* src/styles/TextDisplay.css */
  .text-display {
    font-size: 1.2rem;
    line-height: 1.6;
    margin: 2rem 0;
    padding: 1rem;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.05);
    white-space: pre-wrap;
  }
  
  .char {
    color: #666;
  }
  
  .char.correct {
    color: #000;
  }
  
  .char.incorrect {
    color: #ff0000;
    background-color: rgba(255, 0, 0, 0.1);
  }
  
  .dark .char {
    color: #999;
  }
  
  .dark .char.correct {
    color: #fff;
  }
```

```css
  /* src/styles/TextModal.css */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
  }
  
  .modal h2 {
    margin-top: 0;
  }
  
  .modal textarea {
    width: 100%;
    height: 150px;
    margin: 1rem 0;
    padding: 0.5rem;
    resize: vertical;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  
  .modal button {
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .modal button[type="submit"] {
    background-color: #4CAF50;
    color: white;
    border: none;
  }
  
  .modal button[type="button"] {
    background-color: #f44336;
    color: white;
    border: none;
  }
```

```css
  /* src/styles/ThemeToggle.css */
  .theme-toggle {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 8px;
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
  }
```

```css
  /* src/styles/Timer.css */
  .timer {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }
  
  .time, .wpm {
    display: inline-block;
    margin: 0 1rem;
  }
```

```css
/* src/styles/TypingPage.css */
.typing-page {
    min-height: 100vh;
    padding: 2rem;
    transition: all 0.3s ease;
  }
  
  .typing-page.light {
    background-color: #ffffff;
    color: #333333;
  }
  
  .typing-page.dark {
    background-color: #1a1a1a;
    color: #ffffff;
  }
  
  .custom-text-btn {
    position: absolute;
    top: 20px;
    right: 80px;
    padding: 8px 16px;
    border-radius: 4px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
```

給我所有可能需要更改到的檔案，如html,css ,js, jsx等等，告訴我檔名就好，不用跟我說要怎麼改 