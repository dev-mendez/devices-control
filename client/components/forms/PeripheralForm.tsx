import { FC } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { connectPeripheralReq } from '@/API/HTTP_req'
import type { IPeripheralFormInput, PeripheralFormProps } from '@/types/types.td'



const PeripheralForm: FC<PeripheralFormProps> = ({ props }) => {
  const { _id, toggleModal, reload } = props

  const { register, handleSubmit, formState: { errors } } = useForm<IPeripheralFormInput>({
    defaultValues: {
      idMasterDevice: _id
    },
  })

  const onSubmit: SubmitHandler<IPeripheralFormInput> = async (data) => {

    const output = {
      ...data,
      idMasterDevice: _id,
    }

    const res = await connectPeripheralReq(output)
    if (res.status === 201) {
      toggleModal()
      reload();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className='w-full flex flex-col mt-2'>
        <div className="flex">
          <label className='font-medium'>Unique ID:</label>
          {errors.uid?.type === "required" && (<p className='font-thin text-red-400 ml-auto' role="ipV4">Required</p>)}
        </div>
        <input type='number' className='px-1' {...register("uid", { required: true, maxLength: 20, valueAsNumber: true })} />
      </div>

      <div className='w-full flex flex-col mt-4'>
        <div className="flex">
          <label className='font-medium'>Vendor:</label>
          {errors.vendor?.type === "required" && (<p className='font-thin text-red-400 ml-auto' role="ipV4">Required</p>)}
        </div>
        <input className='px-1 mt-1' {...register("vendor", { required: true, maxLength: 20 })} />
      </div>

      <div className='w-full flex flex-row mt-4'>
        <label className='font-medium hover:cursor-pointer hover:font-bold'>
          <input className='mr-2' type='checkbox' {...register("status", {})} />
          Connect and run:
        </label>
      </div>

      <div className="w-full  mt-4 border text-center">
        <input className='block w-full hover:cursor-pointer bg-green-100 hover:bg-green-300' type="submit" value={'Connect'} />
      </div>

    </form>
  )
}

export default PeripheralForm 