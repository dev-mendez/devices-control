import { FC } from "react";

interface EmptyTableStatusProps {
  props: {
    message: string;
    toggleModal: () => void;
  }
}

export const NoDevice: FC<EmptyTableStatusProps> = ({ props }) => {
  const { message, toggleModal } = props
  return (
    <div className=" bg-white text-gray-300 ml-auto mr-auto  justify-around mt-24">
      <p className=" text-xl">No {message} was found!
        <button onClick={toggleModal} className="hover:cursor-pointer hover:text-green-500"><u> Add one.</u></button>
      </p>
    </div>
  );
}   