import { FC } from "react";
import { NoDevice } from "./No-device-mssge";
import Modal from "./App-modal";

export const WindowDispositives: FC = () => {
  return (
    <div className=" bg-white text-gray-500  h-min min-w-25 pb-5 shadow-inner shadow-gray-300 ">
      <div className="px-2">
        <div className="flex justify-between p-2  text-2xl  border-b-2 shadow shadow-gray-200  border-gray-600">
          <div className="w-1/2 "> <h1 className="design-mode">Master Devices</h1></div>
          <button className=" border border-gray-500 px-2 bg-emerald-200 hover:bg-green-500">Mount</button>
        </div>
      </div>
      <div className="w-full h-auto  flex flex-col  p-2  items-center">
        <Modal />
        <NoDevice />
      </div>
    </div>
  );
}   