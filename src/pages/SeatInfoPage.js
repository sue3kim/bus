import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SeatMap from '../components/SeatMap';
import Modal from '../components/Modal';
import axios from 'axios'; 

const SeatInfoPage = () => {
  const [seatData, setSeatData] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const stationId = searchParams.get('stationId');

  // 좌석 번호와 배열 위치를 매핑하기 위한 테이블
  const seatMap = {
    "1A": [1, 0], "1E": [1, 4],
    "2A": [2, 0], "2E": [2, 4],
    "3A": [3, 0], "3E": [3, 4],
    "4A": [4, 0], "4E": [4, 4],
    "5A": [5, 0], "5B": [5, 1], "5D": [5, 3], "5E": [5, 4],
    "6A": [6, 0], "6B": [6, 1], "6D": [6, 3], "6E": [6, 4],
    "7A": [7, 0], "7B": [7, 1], "7D": [7, 3], "7E": [7, 4],
    "8A": [8, 0], "8B": [8, 1], "8C": [8, 2], "8D": [8, 3], "8E": [8, 4],
  };

  useEffect(() => {
    const fetchSeatData = async () => {
      try {
        const response = await axios.get(`http://3.36.50.16:8000/api/seats`);
        const seatStatus = response.data;

        // 초기 좌석 배열을 정의
        const initialSeatData = [
          [' ', ' ', ' ', ' ', ' '],
          ['O', ' ', ' ', ' ', 'O'],
          ['O', ' ', ' ', ' ', 'O'],
          ['O', ' ', ' ', ' ', 'O'],
          ['O', ' ', ' ', ' ', ' '],
          ['O', 'O', ' ', 'O', 'O'],
          ['O', 'O', ' ', 'O', 'O'],
          ['O', 'O', ' ', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O'],
        ];

        // API 데이터를 바탕으로 좌석 배열 상태 업데이트
        for (const [seatNumber, status] of Object.entries(seatStatus)) {
          const [row, col] = seatMap[seatNumber];
          if (status === 'Available') {
            initialSeatData[row][col] = 'O';  // 빈 좌석
          } else {
            initialSeatData[row][col] = 'X';  // 예약된 좌석
          }
        }

        setSeatData(initialSeatData);
      } catch (error) {
        console.error('Error fetching seat data:', error);
      }
    };

    if (stationId) {
      fetchSeatData();
    }
  }, [stationId]);

  const handleSeatClick = (rowIndex, seatIndex) => {
    const columnLabels = ['A', 'B', 'C', 'D', 'E'];
    const newSeatData = [...seatData];
    const seatNumber = `${rowIndex + 1}${columnLabels[seatIndex]}`;

    if (newSeatData[rowIndex][seatIndex] === 'O') {
      newSeatData[rowIndex][seatIndex] = 'X';
      alert(`${seatNumber}번 좌석을 예약했습니다.`);
    } else if (newSeatData[rowIndex][seatIndex] === 'X') {
      newSeatData[rowIndex][seatIndex] = 'O';
      alert(`${seatNumber}번 좌석 예약을 취소했습니다.`);
    }

    setSeatData(newSeatData);
  };

  const emptySeats = seatData.flat().filter(seat => seat === 'O').length;
  const reservedSeats = seatData.flat().filter(seat => seat === 'X').length;

  const closeModal = () => {
    setShowModal(false);
    navigate('/bus');
  };

  return (
    <Modal show={showModal} handleClose={closeModal}>
      <div style={styles.modalContent}>
        <h1 style={styles.header}>버스 좌석 예약</h1>
        <SeatMap seatData={seatData} handleSeatClick={handleSeatClick} />
        <div style={styles.seatInfo}>
          <p>빈 좌석: {emptySeats}개</p>
          <p>예약된 좌석: {reservedSeats}개</p>
        </div>
      </div>
    </Modal>
  );
};

const styles = {
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: '"Nanum Gothic", sans-serif',
    height: '100%',
    position: 'relative',
  },
  header: {
    textAlign: 'center',
    margin: '20px 0',
    fontSize: '2rem',
  },
  seatInfo: {
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '5px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

export default SeatInfoPage;
