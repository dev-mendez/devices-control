
import { FC } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import type { MasterDeviceFormProps, IMasterDeviceFormInput } from '@/types/types.td'
import { mountDeviceReq } from '@/API/HTTP_req'
import type { IMasterDevice } from "@/types/types.td";
import { Notifications } from '@/components/common/Notifications';


const MasterDeviceForm: FC<MasterDeviceFormProps> = ({ props }) => {
  const { toggleModal, reload } = props

  const { register, handleSubmit } = useForm<IMasterDeviceFormInput>()
  const onSubmit: SubmitHandler<IMasterDeviceFormInput> = async (data) => {
    const res = await mountDeviceReq(data)

    if (res.status === 200) {
      toggleModal();
      reload();
      Notifications('success', `Master-Device is Mounted!`);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className='w-full flex flex-col mt-2'>
        <label className='font-medium'>Serial Nº: </label>
        <input placeholder='1f1c12' data-testid="serial-number-input" className='px-1' {...register("serialNumber", { required: true, maxLength: 20 })} />
      </div>

      <div className='w-full flex flex-col mt-4'>
        <label className='font-medium'>Name: </label>
        <input placeholder='Router' data-testid="name-input" className='px-1' {...register("name", { required: true, maxLength: 20 })} />
      </div>

      <div className='w-full flex flex-col mt-4'>
        <label className='font-medium'>IpV4: </label>
        <input placeholder='255.255.255.255' data-testid="ip-input" className='px-1' {...register("ipV4", { required: true, pattern: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ })} />
      </div>

      <div className="w-full  mt-4 border text-center ">
        <input data-testid="submit-device-button" className='block w-full hover:cursor-pointer bg-green-100 hover:bg-green-300' type="submit" value={'Mount device'} />
      </div>

    </form>
  )
}

export default MasterDeviceForm