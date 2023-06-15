import { FC } from "react";

export const NoDevice: FC = () => {
  return (
    <div className=" bg-white text-gray-300 ml-auto mr-auto  justify-around mt-24">
      <p>No device was found! <span className="hover:cursor-pointer hover:text-green-500"> Mount one.</span></p>
    </div>
  );
}   