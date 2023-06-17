export const mockData = {
  message: "Devices successfully fetched!",
  master_devices: [
    {
       _id: "648d6434b79f1d92c16f3d29",
       serialNumber: "1",
       name: "test",
       ipV4: "10.0.0.1",
       peripherals: [
         {
            _id: "648d644db79f1d92c16f3d31",
            uid: 1,
            vendor: "dd",
            status: true,
            idMasterDevice: "648d6434b79f1d92c16f3d29",
            isDeleted: false,
            createdAt: "2023-06-17T07:44:13.569Z",
            updatedAt: "2023-06-17T07:44:13.569Z",
            __v: 0
          }
        ],
            isDeleted: false,
            createdAt: "2023-06-17T07:43:48.559Z",
            updatedAt: "2023-06-17T07:44:13.575Z",
            __v: 0
        },
        {
            _id: "648d7e640be5590671c2eca2",
            serialNumber: "2",
            name: "test 1",
            ipV4: "10.0.0.2",
            "peripherals": [],
            isDeleted: false,
            createdAt: "2023-06-17T09:35:32.743Z",
            updatedAt: "2023-06-17T09:35:32.743Z",
            __v: 0
        }
    ]
}

export const mockDataAddedDevice = {
  message: "Device successfully created!",
  created_master_device: {
    serialNumber: "3",
    name: "test 3",
    ipV4: "10.0.0.4",
    peripherals: [],
    isDeleted: false,
    _id: "648da83b0be5590671c2ecd1",
    createdAt: "2023-06-17T12:34:03.220Z",
    updatedAt: "2023-06-17T12:34:03.220Z",
    __v: 0
  }
}