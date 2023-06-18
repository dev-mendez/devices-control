import { SetStateAction } from 'react';

// Master Device Interfaces
interface IIdentifiable {
  _id: string;
}

interface IMasterDevice extends IIdentifiable {
  createdAt: string;
  ipV4: string;
  isDeleted: string;
  name: string;
  peripherals: [];
  serialNumber: string;
}

interface IMasterDeviceFormInput {
  serialNumber: string;
  name: string;
  ipV4: string;
}

interface MasterDeviceFormProps {
  props: {
    toggleModal: () => void;
    setMasterDevices: any;
  };
}

// Peripheral Interfaces
interface IPeripheral extends IIdentifiable {
  vendor: string;
  status: boolean;
  uid: number;
  toggleModal: () => void;
  newStatus?: boolean;
  disconnectPeripheral: (_id: string) => Promise<void>;
  changePeripheralStatus: (_id: string, newStatus: boolean) => Promise<void>;
}

interface IPeripheralFormInput {
  vendor: string;
  status: boolean;
  uid: string;
  idMasterDevice: string | unknown;
}

interface PeripheralFormProps {
  props: {
    _id?: string;
    toggleModal: () => void;
  };
}

interface PeripheralsPageProps {
  params: {
    peripheral: string[];
  };
}

interface ModalData {
  props: {
    isOpen: boolean;
    headMessage: string;
    toggleModal: () => void;
    isMasterDeviceView: boolean;
    _id?: string;
    setMasterDevices?: SetStateAction<IMasterDevice[]> | unknown;
  };
}

export type {
  IMasterDevice,
  IPeripheral,
  IMasterDeviceFormInput,
  IPeripheralFormInput,
  PeripheralFormProps,
  PeripheralsPageProps,
  MasterDeviceFormProps,
  ModalData,
};
