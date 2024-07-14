import React from 'react';
import ReactModal from 'react-modal';

const Modal = ({ isOpen, onRequestClose, children }) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Modal"
    ariaHideApp={false}
    style={{
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0',
        border: 'none',
        width: '800px',
        height: '500px',
        overflow: 'hidden',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
      },
    }}
  >
    {children}
  </ReactModal>
);

export default Modal;
