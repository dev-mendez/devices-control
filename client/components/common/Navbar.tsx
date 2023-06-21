import { FC } from "react";
import { TfiSignal } from 'react-icons/tfi'

export const Navbar: FC = () => {
  return (
    <nav className="bg-slate-300 py-0 w-full md:fixed md:z-50 shadow-sm">
      <div className="border-2 p-2 inline-block  bg-slate-500">
        <TfiSignal color="white" className="inline-block  bg-slate-500" size={30} />
        <p className="inline-block pl-2 mb-0 pb-0 font-normal text-slate-100  uppercase">MORE-S CONTROL</p>
      </div>
    </nav>
  );
}