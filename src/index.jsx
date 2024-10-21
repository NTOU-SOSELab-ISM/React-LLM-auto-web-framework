import React from 'react';
import ReactDOM from 'react-dom/client'; // 注意這裡的引入方式
//import './styles/App.css';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
