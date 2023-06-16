import { BlockquoteHTMLAttributes, FC } from "react";

interface Peripheral {
  props: {
    _id: string,
    uid: number,
    status: boolean
    vendor: string
    disconnectPeripheral: (_id: string) => Promise<void>
    changePeripheralStatus: (_id: string, newStatus: boolean) => Promise<void>
  }
}

export const Peripheral: FC<Peripheral> = ({ props }) => {

  const { disconnectPeripheral, changePeripheralStatus, _id, uid, status, vendor } = props

  return (
    <div className="w-full md:flex bg-slate-300 text-gray-500  p-2 my-1 shadow hover:shadow-gray-400">
      <div className="self-center align-middle inline-block p-1">ICONO</div>
      <div className="inline-block flex-row mx-5 space-x-2 md:space-x-4  hover:text-gray-600  md:flex ">
        <div className="sm:flex-column inline-block md:flex">
          <div className="font-bold"><u>UID</u>: </div>
          <div>{uid}</div>
        </div>
        <div className="sm:flex-column inline-block md:flex">
          <div className="font-bold"><u>Status</u>: </div>
          <div>{status ? (<p>Runing...</p>) : <p>Stoped.</p>}</div>
        </div>
      </div>
      <div className="inline-block ml-auto  align-middle self-center space-x-2 md:space-x-4">
        <button onClick={async () => await changePeripheralStatus(_id, !status)}
          className="px-2 border border-gray-200 bg-green-100 hover:bg-green-300">{status ? 'Stop' : 'Run'}
        </button>
        <button onClick={async () => !status ? await disconnectPeripheral(_id) : alert('You must stop the peripheral first')}
          className="px-2 border border-gray-200 bg-red-100 hover:bg-red-300">Disconect
        </button>
      </div>
    </div >
  );
}   