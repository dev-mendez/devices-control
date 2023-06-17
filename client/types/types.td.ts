interface IMasterDevice {
  _id: string;
  createdAt: string;
  ipV4: string;
  isDeleted: string;
  name: string;
  peripherals: [];
  serialNumber: string;
}

interface IPeripheral {
  _id: string;
  vendor: string;
  status: boolean;
  uid: number;
  newStatus?: boolean;
  disconnectPeripheral: (_id: string) => Promise<void>;
  changePeripheralStatus: (_id: string, newStatus: boolean) => Promise<void>;
}

export type { IMasterDevice, IPeripheral };
