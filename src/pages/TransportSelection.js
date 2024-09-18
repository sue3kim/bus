// src/pages/TransportSelection.js
import React from 'react';
import { Link } from 'react-router-dom';
import './TransportSelection.css'; // CSS 파일을 import

const TransportSelection = () => {
  return (
    <div className="transport-container">
      <h1 className="transport-title">이용할 대중교통을 선택하세요</h1>
      
      {/* 버튼들을 감싸는 container */}
      <div className="button-container">
        <button className="transport-button">
          <Link to="/bus" className="link">버스</Link>
        </button>
        
        <button className="transport-button">
          지하철
        </button>
      </div>
    </div>
  );
};

export default TransportSelection;
