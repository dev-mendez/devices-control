'use client'

type Props = {
  props: {
    isOpen: boolean;
    toggleModal: () => void;
    isMasterDeviceView: boolean;
  }
}

const Modal = ({ props }: Props) => {
  const { isOpen, toggleModal, isMasterDeviceView } = props
  return (
    <div>
      {isOpen && (
        <>
          <div className="modal-overlay" onClick={toggleModal}></div>
          <div className="modal">
            <h1>This is a modal</h1>
            <div className="modal-content design-mode-2">
              {isMasterDeviceView ? <p>Master Device</p> : <p>Peripheral</p>}
            </div>
            <button onClick={toggleModal}>Close Modal</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Modal;