import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App"; // 리액트 패키지 임포트해서 리액트 활성화

const root = ReactDOM.createRoot(document.getElementById("root")); // 문서에 id가 root인 디브 태그 선택
root.render(<App />); // 선택한 디브 태그에 메인 Application의 App.js를 그려줌
