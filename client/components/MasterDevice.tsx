import { FC } from "react";

export const MasterDevice: FC = () => {
  return (
    <div className="w-full md:flex bg-slate-300 text-gray-500  p-2 my-1 shadow hover:shadow-gray-400">
      <div className="self-center align-middle inline-block p-1">ICONO</div>
      <div className="inline-block flex-row mx-5 space-x-2 md:space-x-4  hover:text-gray-600  md:flex ">
        <div className="sm:flex-column inline-block md:flex">
          <div className="font-bold"><u>Name</u>: </div>
          <div>Device Name</div>
        </div>
        <div className="sm:flex-column inline-block md:flex">
          <div className="font-bold"><u>Ip</u>: </div>
          <div>144.144.144.0</div>
        </div>
        <div className="sm:flex-column inline-block md:flex">
          <div className="font-bold hover:cursor-pointer"><u>Peripherals</u>: </div>
          <div>8</div>
        </div>
      </div>
      <div className="inline-block ml-auto  align-middle self-center space-x-2 md:space-x-4">
        <button className="px-2 border border-gray-200 bg-green-100 hover:bg-green-300">Add pheripheral</button>
        <button className="px-2 border border-gray-200 bg-red-100 hover:bg-red-300">Unmount</button>
      </div>
    </div>
  );
}   