'use client'
import MasterDeviceForm from "../forms/MasterDeviceForm";
import PeripheralForm from "../forms/PeripheralForm";

type Props = {
  props: {
    isOpen: boolean;
    headMessage: string
    toggleModal: () => void;
    isMasterDeviceView: boolean;
  }

}

const Modal = ({ props }: Props) => {
  const { isOpen, toggleModal, isMasterDeviceView, headMessage } = props
  return (
    <div>
      {isOpen && (
        <>
          <div className="modal-overlay" onClick={toggleModal}></div>
          <div className="modal min-w-fit max-w-full">
            <div className="w-full pb-2 border-b">
              <p onClick={toggleModal} className="border border-1 px-1 rounded inline-block hover:cursor-pointer hover:bg-gray-200 float-right">X</p>
              <h1 className="font-bold">{headMessage}</h1>
            </div>
            <div className="modal-content">
              {isMasterDeviceView ?
                <MasterDeviceForm props={{ toggleModal }} /> :
                <PeripheralForm />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Modal;