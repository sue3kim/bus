/* src/components/SeatMap.js*/

import React from 'react';
import './SeatMap.css';

const SeatMap = ({ seatData, handleSeatClick }) => {
  const columnLabels = ['A', 'B', 'C', 'D', 'E']; // 열 레이블
  
  return (
    <div className="bus-container">
      {seatData.map((row, rowIndex) => (
        <div className="seat-row" key={rowIndex}>
          {row.map((seat, seatIndex) => (
            <div
              key={seatIndex}
              className={`seat ${seat === 'X' ? 'occupied' : seat === 'O' ? 'available' : 'empty'}`}
              onClick={() => seat === ' ' ? null : handleSeatClick(rowIndex, seatIndex)}
            >
              {/* 좌석 번호 표시 */}
              {seat !== ' ' && `${rowIndex }${columnLabels[seatIndex]}`}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatMap;
