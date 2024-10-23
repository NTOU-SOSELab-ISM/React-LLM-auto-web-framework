import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
import Home from './pages/Home';

const toggleTheme = () => {
  const currentTheme = getComputedStyle(document.body).getPropertyValue('--bg-color');
  if (currentTheme.trim() === '#f0f0f0') {
    document.body.style.setProperty('--bg-color', '#333');
    document.body.style.color = '#fff';
  } else {
    document.body.style.setProperty('--bg-color', '#f0f0f0');
    document.body.style.color = '#000';
  }
};

const App = () => (
  <div>
    <button className="switch-theme" onClick={toggleTheme}>Toggle Theme</button>
    <Home />
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
