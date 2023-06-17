import { FC } from "react";
import Link from "next/link";
import { GiWifiRouter } from 'react-icons/gi'

interface MasterDeviceProps {
  props: {
    _id: string,
    name: string,
    ipV4: string
    peripherals: []
    unmountDevice: (_id: string) => Promise<void>
  }
}
const MasterDevice: FC<MasterDeviceProps> = ({ props }) => {
  const { name, ipV4, peripherals, unmountDevice, _id } = props

  return (
    <div className="w-full md:flex bg-slate-300 text-gray-500  p-2 my-1 shadow hover:shadow-gray-400">
      <div className="self-center align-middle inline-block p-1">
        <GiWifiRouter size={30} />
      </div>
      <div className="inline-block flex-row mx-5 space-x-2 md:space-x-4  hover:text-gray-600  md:flex font-mono">
        <div className="sm:flex-column inline-block md:flex justify-center align-middle">
          <div className="font-bold self-center"><u>Name</u>: </div>
          <div className="self-center">{name}</div>
        </div>
        <div className="sm:flex-column inline-block md:flex">
          <div className="font-bold self-center"><u>Ip</u>: </div>
          <div className="font-bold self-center">{ipV4}</div>
        </div>
        <div className="sm:flex-column inline-block md:flex">
          <div className="font-bold hover:cursor-pointer self-center"><u>Peripherals</u>: </div>
          <div className=" self-center">{peripherals.length}</div>
        </div>
      </div>
      <div className="inline-block ml-auto  align-middle self-center space-x-2 md:space-x-4">
        <Link href={`perihperal/${_id}`}>
          <button className="px-2 border border-gray-200 bg-green-100 hover:bg-green-300">Peripherals</button>
        </Link>
        <button onClick={async () => !peripherals.length ? await unmountDevice(_id) : alert('You must disconnect all peripherals first')
        } className="px-2 border border-gray-200 bg-red-100 hover:bg-red-300">Unmount</button>
      </div>
    </div>
  );
}

export default MasterDevice