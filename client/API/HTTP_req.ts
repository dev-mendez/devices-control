import type { IMasterDevice, IPeripheral } from '@/types/types.td';

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
    alert('Deleted');
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

export {
  fetchMasterDevices,
  deleteDevice,
  fetchMasterDevice,
  deletePeripheral,
  togglePeripheralStatus,
};
