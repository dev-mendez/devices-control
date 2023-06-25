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
    reload: () => void;
  };
}

// Peripheral Interfaces
interface IPeripheral extends IIdentifiable {
  vendor: string;
  status: boolean;
  uid: number;
  toggleModal: () => void;
  newStatus?: boolean;
  idMasterDevice: string;
  createdAt: string;
  changePeripheralStatus: (_id: string, newStatus: boolean) => Promise<void>;
  reload: () => void;
}

interface IPeripheralFormInput {
  vendor: string;
  status: boolean;
  uid: number;
  idMasterDevice: string | unknown;
}

interface PeripheralFormProps {
  props: {
    _id?: string;
    toggleModal: () => void;
    reload: () => void;
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
    reload: () => void;
  };
}
interface MasterDeviceProps {
  props: {
    _id: string;
    name: string;
    ipV4: string;
    peripherals: [];
    reload: () => void;
  };
}
interface PeripheralProps {
  props: {
    _id: string;
    vendor: string;
    status: boolean;
    uid: number;
    createdAt: string;
    idMasterDevice: string;
    changePeripheralStatus: (_id: string, newStatus: boolean) => Promise<void>;
    reload: () => void;
  };
}

export type {
  IMasterDevice,
  IPeripheral,
  IMasterDeviceFormInput,
  IPeripheralFormInput,
  PeripheralFormProps,
  PeripheralsPageProps,
  PeripheralProps,
  MasterDeviceFormProps,
  MasterDeviceProps,
  ModalData,
};
