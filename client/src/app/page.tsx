'use client'
import { FC, ReactNode } from "react";
import { NoDevice } from "@/components/utils/EmptyTableStatus";
import { useState } from "react";
import Modal from "@/components/common/CommonModal";
import MasterDevice from "@/components/dispositives/MasterDevice";
import { fetchMasterDevices } from '@/API/HTTP_req'
import type { IMasterDevice } from "@/types/types.td";
import 'react-toastify/dist/ReactToastify.css';
import { useHttp } from "@/hooks/useHttp";

const Home: FC = (): ReactNode => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const { loading, data, refetch } = useHttp({
    factory: fetchMasterDevices,
  });


  return (
    <div className="bg-white text-gray-500  h-min min-w-25 pb-5 shadow-inner shadow-gray-300 ">

      {/* Common modal */}
      <Modal props={{
        isOpen, toggleModal,
        isMasterDeviceView: true,
        headMessage: 'Mount a new Master-Device',
        reload: refetch
      }}
      />

      <div className="px-2">
        <div className="flex justify-between p-2 text-2xl border-b-2 shadow shadow-gray-200 border-gray-600">
          <div className="w-1/2 ">
            <h1 className="design-mode">Master Devices</h1>
          </div>
          <button data-testid="mount-device-button"
            className="border border-white px-2 bg-emerald-100 hover:bg-green-300"
            onClick={toggleModal} >Mount
          </button>
        </div>
      </div>

      <div className="w-full h-auto flex flex-col p-2 items-center">
        {
          /* Custom loader */
          loading && <div>Loading...</div>
        }

        {
          /* Master-Devices */
          data?.master_devices?.map((mdevice: IMasterDevice) => (
            <MasterDevice key={mdevice._id} props={{ ...mdevice, reload: refetch }}
            />
          ))
        }

        {
          /* Empty-data message */
          data?.master_devices?.length === 0 &&
          <NoDevice props={{ message: 'Master Device', toggleModal }} />
        }
      </div>

    </div>
  );
}

export default Home