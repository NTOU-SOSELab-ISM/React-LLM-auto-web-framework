我要使用React和Vite框架實作一個網頁出來，以下是我的使用者需求:

# 打字練習網站需求說明書

## 一、概述

本需求說明書旨在描述一個以 React框架 開發的打字練習網站，讓使用者可以依照網站生成的文本或自己提供的文本進行打字練習。

## 二、功能描述

### 1. 主畫面設計

- **背景**: 提供亮色系與暗色系，切換按鈕在畫面右上方。
- **倒數計時**: 置於畫面上方，有倒數時間，結束時顯示WPM(Words per minutes)。
- **輸入框**: 置於畫面中上方，為輸入文字的位置。
- **文本畫面**: 置於畫面中間，輸入過並正確文字會從灰色變成黑色，錯誤的字會呈現紅色。畫面右上方有按鈕可以自行添加文本。(預設文本皆為英文)
- **鍵盤畫面**: 置於畫面中下方，顯示一個虛擬英文鍵盤，需依照正常鍵盤排版格式，每次按下按鍵時，虛擬鍵盤會點亮按下的按鍵。

### 2. 練習打字功能

- **切換背景**: 按下按鈕後切換背景顏色，預設為亮色系。
- **自動生成文本**: 自動生成文本提供使用者練習。
- **添加文本功能**: 按下按鈕後，跳出文本輸入畫面，有完成、取消按紐，讓使用者自己添加文本練習。
- **即時回饋**: 按下按鍵後，同時在鍵盤畫面顯示，並在文本畫面用顏色顯示是否正確。
- **計時功能**: 在按下第一個按鍵後開始計時， 完成文本後結束計時，並計算完成時間與WPM，顯示在畫面最上方。

## 三、技術要求

- **前端技術**：使用 React.js, CSS 實現所有功能。
- **使用者體驗**：
  - 界面友好，操作簡便。
  - 所有互動均需有明確的視覺反饋。

以下是我的專案環境配置，依照此配置生成出所有符合需求的程式碼:

## Vite 配置設定
```
project name: vite-project
framework select: React
variant select: JavaScript + SWC
```
## src分層架構
```
./src/components //存放jsx的react component檔案
./src/styles //存放component 的 CSS 檔案
./src/pages //存放routing 分頁的jsx檔案
./src/App.jsx //注意App.jsx 和 main.jsx不會放在components資料夾裡面
./src/main.jsx 
./src/index.css //index.css和App.css不會放在styles資料夾裡面
./src/App.css
./index.html
```
## main.jsx
```
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```



style 使用CSS去撰寫
變數名稱使用小駝峰命名、函式名稱使用大駝峰命名
盡量用低耦合的方式撰寫react component
善用useRef、useMemo、useEffect、useState、memo、useContext等等的React 函式
page的routing要用react-router library去實作
注意CSS和jsx是分開放在不同層的資料夾裡，所以components資料夾裡面的jsx要import css的時候的path要是 `/src/styles/{filename}`，注意要從style資料夾找，而不是直接從components資料夾裡面找，但是App.css會是放在和App.jsx同一層，所以App.jsx要import css的時候的path要是`/src/App.css`

給我符合使用者需求並遵照專案環境配置敘述分開給我所有的完整程式碼


