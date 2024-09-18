// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/transport');
  };

  return (
    <div className="home-container">
      <h1 className="home-title">서울특별시 대중교통 좌석 도우미</h1>
      <button onClick={handleStartClick} className="start-button">
        시작하기
      </button>
    </div>
  );
};

export default HomePage;
