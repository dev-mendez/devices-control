'use client'
import React, { useState } from "react";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleModal}>Open Modal</button>
      {isOpen && (
        <>
          <div className="modal-overlay" onClick={toggleModal}></div>
          <div className="modal">
            <h1>This is a modal</h1>
            <div className="modal-content">
        
            </div>
            <button onClick={toggleModal}>Close Modal</button>
          </div>  </>
      )}
    </div>
  );
};

export default Modal;