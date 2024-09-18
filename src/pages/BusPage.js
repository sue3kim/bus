// src/pages/BusPage.js
import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import BusStopComponent from '../components/BusStopComponent';
import './BusPage.css'; // CSS 파일 불러오기

const BusPage = () => {
  const [map, setMap] = useState(null);

  return (
    <div className="bus-page-container">
      <h1 className="bus-page-header">버스정류장을 선택하세요</h1>
      <div className="map-container">
        <MapComponent onMapLoad={setMap} />
        <BusStopComponent map={map} />
      </div>
    </div>
  );
};

export default BusPage;
