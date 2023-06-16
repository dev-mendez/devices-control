import { FC } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

interface PeripheralFormProps {
  props: {
    _id: string
  }
}

interface IFormInput {
  uid: string
  vendor: string
  status: boolean
  idMasterDevice: string
}

const API = 'http://localhost:3001'


const connectPeripheralReq = async (data: IFormInput) => {
  return await fetch(`${API}/peripheral/create`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": 'application/json'
    }
  })
}

const PeripheralForm: FC<PeripheralFormProps> = ({ props }) => {

  const { _id } = props

  const { register, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      idMasterDevice: _id
    },
  })


  const onSubmit: SubmitHandler<IFormInput> = async (data) => {

    //Add  -id  to the data
    const output = {
      ...data,
      idMasterDevice: _id,
    }
    const res = await connectPeripheralReq(output)
    console.log(res.status)
    if (res.status === 201) {
      const data_ = await res.json()
      alert('Connected')
    } else {
      alert('Error conecting device')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className='w-full flex flex-col mt-2'>
        <label className='font-medium'>Unique ID: </label>
        <input type='number' className='px-1' {...register("uid", { required: true, maxLength: 20, valueAsNumber: true })} />
      </div>

      <div className='w-full flex flex-col mt-4'>
        <label className='font-medium'>Vendor: </label>
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