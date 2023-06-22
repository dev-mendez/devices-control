'use client'
import { ModalData } from "@/types/types.td";
import MasterDeviceForm from "../forms/MasterDeviceForm";
import PeripheralForm from "../forms/PeripheralForm";

const Modal = ({ props }: ModalData) => {
  const { _id, isOpen, toggleModal, isMasterDeviceView, headMessage, reload } = props

  return (
    <div>
      {isOpen && (
        <div data-testid="create-dialog">
          <div className="modal-overlay" onClick={toggleModal}></div>
          <div className="modal min-w-fit max-w-full">
            <div className="w-full pb-2 border-b">
              <p onClick={toggleModal}
                className="border border-1 px-1 rounded inline-block hover:cursor-pointer hover:bg-gray-200 float-right">X
              </p>
              <h1 className="font-bold">{headMessage}</h1>
            </div>
            <div className="modal-content">
              {isMasterDeviceView ?
                <MasterDeviceForm props={{ toggleModal, reload }} /> :
                <PeripheralForm props={{ _id, toggleModal, reload }} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;