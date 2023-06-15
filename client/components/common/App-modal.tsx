'use client'

type Props = {
  props: {
    isOpen: boolean;
    toggleModal: () => void;
    isMasterDeviceRoute: boolean;
  }
}

const Modal = ({ props }: Props) => {
  const { isOpen, toggleModal, isMasterDeviceRoute } = props
  return (
    <div>
      {isOpen && (
        <>
          <div className="modal-overlay" onClick={toggleModal}></div>
          <div className="modal">
            <h1>This is a modal</h1>
            <div className="modal-content design-mode-2">
              {isMasterDeviceRoute ? <p>Master Device</p> : <p>Peripheral</p>}
            </div>
            <button onClick={toggleModal}>Close Modal</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Modal;