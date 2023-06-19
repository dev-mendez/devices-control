import type {
  IMasterDevice,
  IPeripheral,
  IPeripheralFormInput,
  IMasterDeviceFormInput,
} from '@/types/types.td';
import { Notifications } from '@/components/common/Notifications';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API || "http://localhost:3001";

const fetchMasterDevices = async (): Promise<Response> =>{
  return  await axios.get(`${API}/masterdevices`); //fetch(`${API}/masterdevices`);
}

async function deleteDevice(
  _id: string,
  master_devices: Array<IMasterDevice>,
  setMasterDevices: ([]) => void
): Promise<void> {
  const response = await fetch(`${API}/masterdevices/delete/${_id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    Notifications('error', `${response.status}`);
    throw new Error(`Error unmounting this device!: ${response}`);
  } else {
    setMasterDevices(master_devices.filter((device) => device._id !== _id));
    Notifications('success', 'Succesfully unmounted!');
  }
}

const fetchMasterDevice = async (_id: string) =>
  await fetch(`${API}/masterdevices/${_id} `);

function deletePeripheral(_id: string): Promise<Response> {
  return fetch(`${API}/peripheral/delete/${_id}`, { method: 'DELETE' });
}

const connectPeripheralReq = async (
  data: IPeripheralFormInput
): Promise<Response> => {
  const response = await fetch(`${API}/peripheral/create`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });
  console.log(response);
  if (!response.ok) {
    Notifications('error', `It's not possible to add this peripheral!`);
  } else {
    Notifications('success', `Peripheral connected!`);
  }

  return response;
};

async function togglePeripheralStatus(
  _id: string,
  peripherals: Array<IPeripheral>,
  setPeripherals: ([]) => void,
  newStatus: boolean
): Promise<void> {
  const response = await fetch(`${API}/peripheral/update/${_id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: newStatus }),
    headers: { 'Content-type': 'application/json' },
  });

  if (!response.ok) {
    Notifications('error', `${response.status}`);
    throw new Error(`Error updating this peripheral: ${response}`);
  } else {
    setPeripherals(
      peripherals.map((peripheral) =>
        peripheral._id === _id
          ? { ...peripheral, status: newStatus }
          : peripheral
      )
    );
    Notifications(
      'success',
      `Peripheral ${!newStatus ? 'was Stopped!' : 'is Running!'}`
    );
  }
}

const mountDeviceReq = async (data: IMasterDeviceFormInput) => {
  const response = await fetch(`${API}/masterdevices/create`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (!response.ok) {
    Notifications(
      'error',
      'Something went wrong! The serial number and the Ip must be unique!'
    );
  } else {
    Notifications('success', `Master-Device is Mounted!`);
  }
  return response;
};

export {
  fetchMasterDevices,
  deleteDevice,
  fetchMasterDevice,
  deletePeripheral,
  connectPeripheralReq,
  togglePeripheralStatus,
  mountDeviceReq,
};
