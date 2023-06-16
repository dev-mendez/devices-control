import { FC } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

interface PeripheralFormProps {

}

interface IFormInput {
  peripheral_UID: string
  peripheral_vendor: string
  peripheral_isRunning: boolean
}

const PeripheralForm: FC<PeripheralFormProps> = ({ }) => {
  const { register, handleSubmit } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='w-full flex flex-col mt-2'>
        <label className='font-medium'>Unique ID: </label>
        <input type='number' className='px-1' {...register("peripheral_UID", { required: true, maxLength: 20, valueAsNumber: true })} />
      </div>
      <div className='w-full flex flex-col mt-4'>
        <label className='font-medium'>Vendor: </label>
        <input className='px-1 mt-1' {...register("peripheral_vendor", { required: true, maxLength: 20 })} />
      </div>
      <div className='w-full flex flex-row mt-4'>
        <label className='font-medium hover:cursor-pointer hover:font-bold'>
          <input className='mr-2' type='checkbox' {...register("peripheral_vendor", { required: true, maxLength: 20 })} />
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