// src/components/MapComponent.js
import React, { useEffect } from 'react';

const MapComponent = ({ onMapLoad }) => {
  useEffect(() => {
    const { naver } = window;
    const map = new naver.maps.Map('map', {});

    if (onMapLoad) {
      onMapLoad(map);
    }
  }, [onMapLoad]);

  return <div id="map" style={{ width: '100%', height: '100%' }} />; // height 수정
};

export default MapComponent;
