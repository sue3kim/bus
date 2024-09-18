// src/components/Modal.js
import React from 'react';
import './Modal.css'; // 스타일 파일을 따로 만들어서 스타일 적용

const Modal = ({ show, handleClose, children }) => {
  return (
    show ? (
      <div className="modal-backdrop">
        <div className="modal-content">
          <button className="modal-close" onClick={handleClose}>X</button>
          {children}
        </div>
      </div>
    ) : null
  );
};

export default Modal;