import { FC } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

interface PeripheralFormProps {

}

interface IFormInput {
  device_name: string
  device_ipv4: string
}

const PeripheralForm: FC<PeripheralFormProps> = ({ }) => {
  const { register, handleSubmit } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='w-full flex flex-col mt-2'>
        <label className='font-bold'>Name: </label>
        <input className='px-1' {...register("device_name", { required: true, maxLength: 20 })} />
      </div>
      <div className='w-full flex flex-col mt-2'>
        <label className='font-bold'>IpV4: </label>
        <input className='px-1' {...register("device_ipv4", { required: true, pattern: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ })} />
      </div>
      <div className="w-full  mt-4 border text-center ">
        <input className='block w-full hover:cursor-pointer bg-green-100 hover:bg-green-300' type="submit" value={'Mount device'} />
      </div>
    </form>
  )
}

export default PeripheralForm 