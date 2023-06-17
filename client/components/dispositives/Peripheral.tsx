import { FC } from "react";
import { MdOutlineDevicesOther } from "react-icons/md";
import { Notifications } from "../common/Notifications";

interface Peripheral {
  props: {
    _id: string,
    uid: number,
    status: boolean
    vendor: string
    toggleModal: () => void
    disconnectPeripheral: (_id: string) => Promise<void>
    changePeripheralStatus: (_id: string, newStatus: boolean) => Promise<void>
  }
}

export const Peripheral: FC<Peripheral> = ({ props }) => {

  const { disconnectPeripheral, changePeripheralStatus, _id, uid, status } = props

  return (
    <div data-testid={_id} className="w-full md:flex bg-slate-300 text-gray-500  p-2 my-1 shadow hover:shadow-gray-400">
      <div className="self-center align-middle inline-block p-1"><MdOutlineDevicesOther size={30} /></div>
      <div className="inline-block flex-row mx-5 space-x-2 md:space-x-4  hover:text-gray-600  md:flex font-mono align-middle">
        <div className="sm:flex-column inline-block md:flex self-center">
          <div className="font-bold"><u>UID</u>: </div>
          <div className=" self-center">{uid}</div>
        </div>
        <div className="sm:flex-column inline-block md:flex">
          <div className="font-bold self-center"><u>Status</u>: </div>
          <div className=" self-center">{status ? (
            <p className=" text-green-500">Running...</p>) :
            <p className="text-gray-400">Stopped.</p>}
          </div>
        </div>
      </div>
      <div className="inline-block ml-auto float-right  align-middle self-center space-x-2 md:space-x-4">
        <button onClick={async () => await changePeripheralStatus(_id, !status)}
          className="px-2 border border-gray-200 bg-green-100 hover:bg-green-300">{status ? 'Stop' : 'Run'}
        </button>
        <button onClick={async () => !status ? await disconnectPeripheral(_id) : Notifications('error', 'You must stop the peripheral first')}
          className="px-2 border border-gray-200 bg-red-100 hover:bg-red-300">Disconnect
        </button>
      </div>
    </div >
  );
}   