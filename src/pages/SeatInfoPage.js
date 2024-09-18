import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SeatMap from '../components/SeatMap';
import Modal from '../components/Modal';

const SeatInfoPage = () => {
  const [seatData, setSeatData] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const stationId = searchParams.get('stationId');

  useEffect(() => {
    console.log(`정류장 ID: ${stationId}`);

    const fetchedSeatData = [
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

    setSeatData(fetchedSeatData);
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

  const goToNextPage = () => {
    navigate('/nextPage'); // 원하는 페이지로 이동
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
        <button onClick={goToNextPage} style={styles.nextPageButton}>다음 페이지로 이동</button>
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
  nextPageButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default SeatInfoPage;
