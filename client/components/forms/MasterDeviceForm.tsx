
import { FC } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import type { MasterDeviceFormProps, IMasterDeviceFormInput } from '@/types/types.td'
import { mountDeviceReq } from '@/API/HTTP_req'

const MasterDeviceForm: FC<MasterDeviceFormProps> = ({ props }) => {

  const { toggleModal } = props

  const { register, handleSubmit } = useForm<IMasterDeviceFormInput>()
  const onSubmit: SubmitHandler<IMasterDeviceFormInput> = async (data) => {
    const res = await mountDeviceReq(data)

    if (res.status === 200) {
      const data_ = await res.json()
      toggleModal()
      alert('Mounted')
    } else {
      alert('Error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='w-full flex flex-col mt-2'>
        <label className='font-medium'>Serial Nº: </label>
        <input className='px-1' {...register("serialNumber", { required: true, maxLength: 20 })} />
      </div> <div className='w-full flex flex-col mt-4'>
        <label className='font-medium'>Name: </label>
        <input className='px-1' {...register("name", { required: true, maxLength: 20 })} />
      </div>
      <div className='w-full flex flex-col mt-4'>
        <label className='font-medium'>IpV4: </label>
        <input className='px-1' {...register("ipV4", { required: true, pattern: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ })} />
      </div>
      <div className="w-full  mt-4 border text-center ">
        <input className='block w-full hover:cursor-pointer bg-green-100 hover:bg-green-300' type="submit" value={'Mount device'} />
      </div>
    </form>
  )
}

export default MasterDeviceForm