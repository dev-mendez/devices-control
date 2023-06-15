'use client'
import { useState } from "react";
import { FC } from "react";
import { NoDevice } from "@/components/utils/Empty-table";
import { Peripheral } from "@/components/Peripheral";
import Link from "next/link";
import Modal
  from "@/components/common/App-modal";
const WindowPeripherals: FC = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" bg-white text-gray-500  h-min min-w-25 pb-5 shadow-inner shadow-gray-300">
      <div className="px-2">
        <div className="flex justify-between p-2  text-2xl  border-b-2 shadow shadow-gray-200  border-gray-600">
          <div className="w-1/2 "> <h1 className="design-mode">Pheripherals</h1></div>
          <Link href={'/'}>
            <button className=" border border-gray-500 px-2 bg-emerald-200 hover:bg-green-500">Go back</button>
          </Link>
          <button onClick={toggleModal} className="border border-gray-500 px-2 bg-emerald-200 hover:bg-green-500">Add perihperal</button>
        </div>
      </div>
      <div className="w-full h-auto  flex flex-col  p-2  items-center ">
        <Modal props={{ isOpen, toggleModal, isMasterDeviceRoute: false }} />
        <Peripheral />
        {/* <NoDevice /> */}
      </div>
    </div>
  );
}

export default WindowPeripherals