import { FC } from "react";
import Link from "next/link";
import { GiWifiRouter } from 'react-icons/gi'
import { Notifications } from '@/components/common/Notifications';
import { useHttp } from "@/hooks/useHttp";
import { deletMasterDevice } from '@/API/HTTP_req'
import { MasterDeviceProps } from "@/types/types.td";


const MasterDevice: FC<MasterDeviceProps> = ({ props }) => {
  const { name, ipV4, peripherals, _id, reload } = props

  const { refetch: deleteDevice } = useHttp({
    factory: () => deletMasterDevice(_id),
    shouldCallOnFirstRender: false
  });

  async function onDelete() {
    if (!peripherals.length) {
      await deleteDevice();
      reload();
      Notifications('success', 'The device was unmounted!');
    } else {
      Notifications('error', 'You must disconnect all peripherals first');
    }
  }

  return (
    <div data-testid={_id} className="w-full md:flex bg-slate-300 text-gray-500  p-2 my-1 shadow hover:shadow-gray-400">
      <div className="self-center align-middle inline-block p-1">
        <GiWifiRouter size={30} />
      </div>
      <div className="inline-block flex-row mx-5 space-x-2 md:space-x-4  hover:text-gray-600  md:flex font-mono">
        <div className="sm:flex-column inline-block md:flex">
          <div className="font-bold self-center"><u>Name</u>: </div>
          <div className="self-center">{name}</div>
        </div>
        <div className="sm:flex-column inline-block md:flex">
          <div className="font-bold self-center"><u>Ip</u>: </div>
          <div className="font-bold self-center">{ipV4}</div>
        </div>
        <Link href={`peripheral/${_id}`} className="sm:flex-column inline-block md:flex">
          <div className="font-bold hover:cursor-pointer self-center"><u>Peripherals</u>: </div>
          <div className='self-center'>{peripherals.length < 10 ?
            (<p className=" text-green-700">{peripherals.length}</p>) :
            (<p className="text-red-400">{peripherals.length}</p>)
          }
          </div>
        </Link>
      </div>
      <div className="inline-block ml-auto float-right  align-middle self-center space-x-2 md:space-x-4">
        <Link href={`peripheral/${_id}`}>
          <button className="px-2 border border-gray-200 bg-green-100 hover:bg-green-300">Peripherals</button>
        </Link>
        <button
          data-testid={`${_id}-delete-device-button`}
          onClick={onDelete} className="px-2 border border-gray-200 bg-red-100 hover:bg-red-300">Unmount</button>
      </div>
    </div >
  );
}

export default MasterDevice;