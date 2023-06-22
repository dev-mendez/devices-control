import type {
  IPeripheral,
  IPeripheralFormInput,
  IMasterDeviceFormInput,
} from '@/types/types.td';
import { Notifications } from '@/components/common/Notifications';

const API = process.env.NEXT_PUBLIC_API || 'http://localhost:3001';

function fetchMasterDevices(): Promise<Response> {
  return fetch(`${API}/masterdevices`);
}

function fetchMasterDevice(_id: string): Promise<Response> {
  return fetch(`${API}/masterdevices/${_id}`);
}

function deletMasterDevice(_id: string): Promise<Response> {
  return fetch(`${API}/masterdevices/delete/${_id}`, { method: 'DELETE' });
}

function deletePeripheral(_id: string): Promise<Response> {
  return fetch(`${API}/peripheral/delete/${_id}`, { method: 'DELETE' });
}

async function connectPeripheralReq(
  data: IPeripheralFormInput
): Promise<Response> {
  const response = await fetch(`${API}/peripheral/create`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json' },
  });

  if (!response.ok) {
    Notifications('error', `It's not possible to connect this peripheral!`);
  } else {
    Notifications('success', `Peripheral connected!`);
  }
  return response;
}

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

async function mountDeviceReq(data: IMasterDeviceFormInput) {
  const response = await fetch(`${API}/masterdevices/create`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json' },
  });

  if (!response.ok) {
    Notifications(
      'error',
      'Something went wrong! The serial number and the Ip must be unique!'
    );
  }
  return response;
}

export {
  fetchMasterDevices,
  deletMasterDevice,
  fetchMasterDevice,
  deletePeripheral,
  connectPeripheralReq,
  togglePeripheralStatus,
  mountDeviceReq,
};
