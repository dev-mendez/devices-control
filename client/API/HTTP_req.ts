import type {
  IMasterDevice,
  IPeripheral,
  IPeripheralFormInput,
  IMasterDeviceFormInput,
} from '@/types/types.td';
import { Notifications } from '@/components/common/Notifications';

const API = 'http://localhost:3001';

const fetchMasterDevices = async () => await fetch(`${API}/masterdevices`);

async function deleteDevice(
  _id: string,
  master_devices: Array<IMasterDevice>,
  setMasterDevices: ([]) => void
): Promise<void> {
  const response = await fetch(`${API}/masterdevices/delete/${_id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Error deleting device: ${response.status}`);
  } else {
    setMasterDevices(master_devices.filter((device) => device._id !== _id));
    Notifications('success', 'Unmounted');
  }
}

const fetchMasterDevice = async (_id: string) =>
  await fetch(`${API}/masterdevices/${_id} `);

async function deletePeripheral(
  _id: string,
  peripherals: Array<IPeripheral>,
  setPeripherals: ([]) => void
): Promise<void> {
  const response = await fetch(`${API}/peripheral/delete/${_id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Error deleting device: ${response.status}`);
  } else {
    setPeripherals(peripherals.filter((peripheral) => peripheral._id !== _id));
  }
}

const connectPeripheralReq = async (data: IPeripheralFormInput) => {
  return await fetch(`${API}/peripheral/create`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });
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
    throw new Error(`Error updating this peripheral: ${response.status}`);
  } else {
    setPeripherals(
      peripherals.map((peripheral) =>
        peripheral._id === _id
          ? { ...peripheral, status: newStatus }
          : peripheral
      )
    );
  }
}

const mountDeviceReq = async (data: IMasterDeviceFormInput) => {
  return await fetch(`${API}/masterdevices/create`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });
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