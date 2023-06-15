import { FC } from "react";
import { NoDevice } from "@/components/No-device-mssge";
import { Peripheral } from "@/components/peripheral";

const WindowPeripherals: FC = () => {
  return (
    <div className=" bg-white text-gray-500  h-min min-w-25 pb-5 shadow-inner shadow-gray-300">
      <div className="px-2">
        <div className="flex justify-between p-2  text-2xl  border-b-2 shadow shadow-gray-200  border-gray-600">
          <div className="w-1/2 "> <h1 className="design-mode">Pheripherals</h1></div>
          <button className=" border border-gray-500 px-2 bg-emerald-200 hover:bg-green-500">Go back</button>
        </div>
      </div>
      <div className="w-full h-auto  flex flex-col  p-2  items-center ">
        <Peripheral />
        <NoDevice />
      </div>
    </div>
  );
}

export default WindowPeripherals