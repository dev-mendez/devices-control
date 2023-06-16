'use client'

import { FC } from "react";
import { NoDevice } from "@/components/utils/EmptyTableStatus";
import { useState, useEffect } from "react";
import Modal from "@/components/common/CommonModal";
import MasterDevice from "@/components/dispositives/MasterDevice";



const fetchMasterDevices = async () => await fetch('http://localhost:3001/masterdevices');

async function deleteDevice(_id: string, master_devices: Array<MasterDevice>, setMasterDevices: ([]) => void): Promise<void> {
  const response = await fetch(`http://localhost:3001/masterdevices/delete/${_id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error(`Error deleting device: ${response.status}`);
  } else {
    setMasterDevices(master_devices.filter((device) => device._id !== _id))
    alert('Deleted')
  }
}

interface MasterDevice {
  _id: string,
  createdAt: string,
  ipV4: string,
  isDeleted: string,
  name: string
  peripherals: [],
  serialNumber: string
}

const Home: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [masterDevices, setMasterDevices] = useState<MasterDevice[]>([])

  const toggleModal = () => setIsOpen(!isOpen);

  const unmountDevice = (_id: string): Promise<void> => deleteDevice(_id, masterDevices, setMasterDevices)


  useEffect(() => {
    fetchMasterDevices().then((res) => res.json()).then((data) => {
      setMasterDevices(data.master_devices)
    })


  }, [isOpen])



  return (
    <div className=" bg-white text-gray-500  h-min min-w-25 pb-5 shadow-inner shadow-gray-300 ">
      <Modal props={{ isOpen, toggleModal, isMasterDeviceView: true, headMessage: 'Mount a new Master-Device' }} />
      <div className="px-2">
        <div className="flex justify-between p-2  text-2xl  border-b-2 shadow shadow-gray-200  border-gray-600">
          <div className="w-1/2 "> <h1 className="design-mode">Master Devices</h1></div>
          <button onClick={toggleModal} className="border border-white px-2 bg-emerald-100 hover:bg-green-300">Mount</button>
        </div>
      </div>
      <div className="w-full h-auto  flex flex-col  p-2  items-center">
        {masterDevices.map((mdevice, id) => (<MasterDevice key={id} props={{ ...mdevice, unmountDevice }} />))}
        {masterDevices.length ? null : (<NoDevice props={{ message: 'Master Device', toggleModal }} />)}
      </div>
    </div>
  );
}

export default Home