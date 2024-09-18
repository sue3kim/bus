// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TransportSelection from './pages/TransportSelection';
import BusPage from './pages/BusPage';
import BusStopDetailPage from './pages/BusStopDetailPage';
import SeatInfoPage from './pages/SeatInfoPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/transport" element={<TransportSelection />} />
        <Route path="/bus" element={<BusPage />} />
        <Route path="/bus-stop/:id" element={<BusStopDetailPage />} />
        <Route path="/seat-info" element={<SeatInfoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
