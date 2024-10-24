import { useState } from 'react';
import TypingArea from '../components/TypingArea.jsx';
import Keyboard from '../components/Keyboard.jsx';
import '../styles/HomePage.css';

function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [customText, setCustomText] = useState(''); // 自訂文本的狀態
  const [showInputModal, setShowInputModal] = useState(false); // 控制文本上傳的modal顯示
  const [typingText, setTypingText] = useState('This is a typing test. Type the following text.'); // 練習的文本

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const openInputModal = () => {
    setShowInputModal(true);
  };

  const closeInputModal = () => {
    setShowInputModal(false);
  };

  const handleCustomTextChange = (e) => {
    setCustomText(e.target.value);
  };

  const handleCustomTextSubmit = () => {
    if (customText.trim() !== '') {
      setTypingText(customText); // 更新練習的文本為自訂文本
      setCustomText(''); // 清空自訂文本區
    }
    setShowInputModal(false); // 關閉彈窗
  };

  return (
    <div className={`homepage ${isDarkMode ? 'dark' : 'light'}`}>
      <button onClick={toggleMode} className="mode-toggle">
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>

      <button onClick={openInputModal} className="upload-text">
        Upload Custom Text
      </button>

      <TypingArea customText={typingText} isDarkMode={isDarkMode} />

      <Keyboard isDarkMode={isDarkMode} />

      {/* 自訂文本的輸入框彈窗 */}
      {showInputModal && (
        <div className="modal">
          <div className="modal-content">
            <textarea
              value={customText}
              onChange={handleCustomTextChange}
              placeholder="Enter custom text for typing..."
              rows="4"
            />
            <button onClick={handleCustomTextSubmit}>Submit</button>
            <button onClick={closeInputModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
