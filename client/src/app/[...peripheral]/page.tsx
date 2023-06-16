'use client'
import { useEffect, useState } from "react";
import { FC } from "react";
import { NoDevice } from "@/components/utils/EmptyTableStatus";
import { Peripheral } from "@/components/dispositives/Peripheral";
import Link from "next/link";
import Modal from "@/components/common/CommonModal";


const fetchMasterDevice = async (_id: string) => await fetch(`http://localhost:3001/masterdevices/${_id}`);



async function deletePeripheral(_id: string, peripherals: Array<IPeripheral>, setPeripherals: ([]) => void): Promise<void> {
  const response = await fetch(`http://localhost:3001/peripheral/delete/${_id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error(`Error deleting device: ${response.status}`);
  } else {
    setPeripherals(peripherals.filter((peripheral) => peripheral._id !== _id))
    alert('Deleted')
  }
}

interface PeripheralsPageProps {
  params: any
}

interface IPeripheral {
  _id: string,
  vendor: string,
  status: string
  uid: number,
  disconnectPeripheral: (_id: string) => Promise<void>
}

const PeripheralsPage: FC<PeripheralsPageProps> = ({ params }) => {

  const _id = params.peripheral[1]
  const [isOpen, setIsOpen] = useState(false);
  const [perihperals, setPeripherals] = useState<IPeripheral[]>([])

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const disconnectPeripheral = (_id: string): Promise<void> => deletePeripheral(_id, perihperals, setPeripherals)

  useEffect(() => {

    // console.log(_id)
    fetchMasterDevice('648be464a7cdb66ad437c53e').then((response) => response.json().then((data) => setPeripherals(data.fetched_device.peripherals)
    ))
    console.log(perihperals)
    // )
  }, [isOpen])


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
        <Modal props={{ isOpen, toggleModal, isMasterDeviceView: false, _id, headMessage: 'Connect a new Peripheral on this device' }} />
        {perihperals.map((perihperal, id) => (<Peripheral key={id} props={{ ...perihperal, disconnectPeripheral }} />))}
        {perihperals.length ? null : (<NoDevice props={{ message: 'Peripherals', toggleModal }} />)}
      </div>
    </div>
  );
}

export default PeripheralsPage