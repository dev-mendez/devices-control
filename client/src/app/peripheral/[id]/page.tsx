'use client'
import { ReactNode, useState, useLayoutEffect } from "react";
import { FC } from "react";
import { useParams } from 'next/navigation'
import { NoDevice } from "@/components/utils/EmptyTableStatus";
import { Peripheral } from "@/components/dispositives/Peripheral";
import Link from "next/link";
import Modal from "@/components/common/CommonModal";
import { MdOutlineArrowBackIos } from 'react-icons/md'
import { fetchMasterDevice, deletePeripheral, togglePeripheralStatus } from '@/API/HTTP_req'
import type { IPeripheral, PeripheralsPageProps } from '@/types/types.td'
import { Notifications } from "@/components/common/Notifications";
import { useHttp } from "@/hooks/useHttp";

const PeripheralsPage: FC<PeripheralsPageProps> = ({ params }): ReactNode => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [perihperals, setPeripherals] = useState<IPeripheral[]>([])

  const { loading, refetch } = useHttp({
    factory: () => fetchMasterDevice(id),
    onComplete: (data: any) => {
      setPeripherals(data.fetched_device.peripherals);
    }
  });

  const toggleModal = (): void => setIsOpen(!isOpen);

  const disconnectPeripheral = async (id: string): Promise<void> => {
    try {
      const response = await deletePeripheral(id)

      if (response.ok) {
        setPeripherals(perihperals.filter((peripheral) => peripheral._id !== id));
        Notifications('success', 'Succesfully disconnected!');

      }
    } catch (error) {
      Notifications('error', 'Error');
    }
  }

  const changePeripheralStatus = (_id: string, newStatus: boolean): Promise<void> => {
    return togglePeripheralStatus(_id, perihperals, setPeripherals, newStatus)
  }

  return (
    <div className=" bg-white text-gray-500  h-min min-w-25 pb-5 shadow-inner shadow-gray-300">
      <div className="px-2">
        <div className="flex justify-between p-2  text-2xl  border-b-2 shadow shadow-gray-200  border-gray-600">
          <div className="w-1/2 ">
            <h1>Pheripherals</h1></div>
          <div className="space-x-2 flex flex-row">
            <Link className="flex align-middle" href={'/'}>
              <button className="px-2 bg-emerald-200 hover:bg-green-100 self-center">
                <MdOutlineArrowBackIos size={30} />
              </button>
            </Link>
            <button onClick={toggleModal} className=" px-2 bg-emerald-200 hover:bg-green-300">
              <p className="">Connect</p>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col p-2 items-center">
        <Modal 
         props={{ 
          isOpen, 
          toggleModal, 
          isMasterDeviceView: false, 
          _id: id, 
          headMessage: 'Connect a new Peripheral on this device',
          reload: refetch
          }} 
        />
        
        {loading && <div>Loading...</div>}
        {
          perihperals.map((perihperal) => (
            <Peripheral
              key={perihperal._id}
              {...perihperal}
              disconnectPeripheral={disconnectPeripheral}
              changePeripheralStatus={changePeripheralStatus}
              toggleModal={toggleModal}
            />
          ))
        }
        {perihperals.length === 0 && <NoDevice props={{ message: 'Peripherals', toggleModal }} />}
      </div>
    </div>
  );
}

export default PeripheralsPage