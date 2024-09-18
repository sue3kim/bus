import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가

const Modal = ({ show, onClose, station, busInfo }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  if (!show) return null;

  const handleBusClick = (bus) => {
    navigate(`/seat-info?busNumber=${bus}`); // 버스 번호를 쿼리 파라미터로 전달하며 페이지 이동
  };

  const buttons = busInfo.map((bus, index) => (
    <button key={index} style={styles.button} onClick={() => handleBusClick(bus)}>
      {bus}
    </button>
  ));

  return (
    <div style={styles.modalBackground}>
      <div style={styles.modalContainer}>
        <h2>{station ? station.stNm : "정류장 정보"}</h2>
        <div style={styles.buttonContainer}>
          {buttons}
        </div>
        <button onClick={onClose} style={styles.closeButton}>닫기</button>
      </div>
    </div>
  );
};

const styles = {
  modalBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    width: '80%',
    height: '70%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflowY: 'auto',
  },
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '10px',
    height: '100%',
  },
  button: {
    flex: '1 1 calc(20% - 10px)',
    height: '60px',
    backgroundColor: '#40E0D0',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#FFFFFF',
    color: 'black',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

const BusStopComponent = ({ map }) => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [busInfo, setBusInfo] = useState([]);

  const stations = [
    { stNm: '국민대앞', tmX: 126.9941451, tmY: 37.6106673 },
    { stNm: '국민대학교앞', tmX: 126.9946719, tmY: 37.6107732 },
    { stNm: '북한산국립공원입구버스정류장', tmX: 126.9992575, tmY: 37.6176946 },
    { stNm: '삼덕단지.성북구 최만린 미술관', tmX: 127.0050548, tmY: 37.6104345 },
    { stNm: '성북청수도서관.정릉4동성당', tmX: 127.0084588, tmY: 37.6115394 },
    { stNm: '정릉공항버스정류장', tmX: 127.0112517, tmY: 37.6048700 },
    { stNm: '도봉세무서.성북시장', tmX: 127.0287930, tmY: 37.6195857 },
    { stNm: '성북빌리지1', tmX: 126.9965361, tmY: 37.5967385 },
    { stNm: '성북빌리지2', tmX: 126.9964486, tmY: 37.5966845 },
    { stNm: '성북구립미술관.쌍다리앞1', tmX: 126.9959262, tmY: 37.5938545 },
    { stNm: '성북구립미술관.쌍다리앞2', tmX: 126.9958454, tmY: 37.5936696 },
    { stNm: '삼선교.성북문화원', tmX: 127.0058601, tmY: 37.5890114 },
    { stNm: '성북세무서앞', tmX: 127.0101262, tmY: 37.5882197 },
    { stNm: '성신여대입구역', tmX: 127.0164082, tmY: 37.5937121 },
    { stNm: '성북구청1', tmX: 127.0175901, tmY: 37.5899267 },
    { stNm: '성북구청2', tmX: 127.0181500, tmY: 37.5893714 },
    { stNm: '성북구청.성북경찰서1', tmX: 127.0172467, tmY: 37.5886190 },
    { stNm: '성북구청.성북경찰서2', tmX: 127.0172937, tmY: 37.5882705 },
    { stNm: '성북구의회1', tmX: 127.0262201, tmY: 37.5944926 },
    { stNm: '성북구의회2', tmX: 127.0265406, tmY: 37.5945352 },
  ];

  const busData = [
    '성북04', '6414', '3090', '6415', '3357',
    '성북03', '성북20', '성북22', '3382', '5584',
    '3219', '70', '3213', '5522', '3213',
    '성북01', '3213', '5432', '2334', '32'
  ];

  useEffect(() => {
    const { naver } = window;

    if (map) {
      const mapOptions = {
        center: new naver.maps.LatLng(37.589169, 127.016431),
        zoom: 14,
      };
      map.setOptions(mapOptions);

      stations.forEach(station => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(station.tmY, station.tmX),
          map: map,
          title: station.stNm,
        });

        naver.maps.Event.addListener(marker, 'click', () => {
          setSelectedStation(station);
          setBusInfo(busData);
          setShowModal(true);
        });
      });
    }
  }, [map]);

  return (
    <>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        station={selectedStation}
        busInfo={busInfo}
      />
    </>
  );
};

export default BusStopComponent;
