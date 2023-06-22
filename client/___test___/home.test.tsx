import Home from '@/src/app/page';
import '@testing-library/jest-dom'
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { mockData, mockDataAddedDevice } from '@/__mocks__/data';
import { deleteDeviceV1 } from '../API/HTTP_req';
import { useHttp } from '../hooks/useHttp';
import { Notifications } from '@/components/common/Notifications';

jest.mock('../API/HTTP_req', () => ({
  __esModule: true,
  ...jest.requireActual('../API/HTTP_req'),
  mountDeviceReq: () => Promise.resolve({
    status: 200,
    json: () => Promise.resolve(mockDataAddedDevice),
  }),
  deleteDeviceV1: jest.fn()
}));
jest.mock('../components/common/Notifications')
jest.mock('../hooks/useHttp', ()=>({
  useHttp: () => ({
    loading: false,
    refetch: jest.fn(),
    data: mockData
  })
}));

describe('Home', () => {
  it('should display the devices in the list', async () => {
    render(<Home />);

    expect(screen.queryByText(/Master Devices/)).toBeInTheDocument();

    await waitFor(() => {
      mockData.master_devices.forEach((device) => {
        expect(screen.queryByTestId(device._id)).toBeInTheDocument();
      })
    })
  })

  it('should add a devices', async () => {
    render(<Home />);

    const mountButton = screen.getByTestId('mount-device-button');

    fireEvent.click(mountButton);

    await waitFor(() => {
      expect(screen.queryByTestId('create-dialog')).toBeInTheDocument();
    })

    const serialInput = screen.getByTestId('serial-number-input');
    fireEvent.change(serialInput, { target: { value: '1' } });

    const nameInput = screen.getByTestId('name-input');
    fireEvent.change(nameInput, { target: { value: 'new device' } });

    const ipInput = screen.getByTestId('ip-input');
    fireEvent.change(ipInput, { target: { value: '10.0.0.4' } });

    const submitDeviceButton = screen.getByTestId('submit-device-button');

    fireEvent.click(submitDeviceButton);

    await waitFor(() => {
      expect(screen.queryByTestId('create-dialog')).not.toBeInTheDocument();
    })

    expect(Notifications).toHaveBeenCalledWith('success', 'The device was created successfully');
  })

  it("should delete device", async () => {
    render(<Home />);

    await waitFor(() => {
      mockData.master_devices.forEach((device) => {
        expect(screen.queryByTestId(device._id)).toBeInTheDocument();
      })
    })

    const deleteDeviceButton = screen.getByTestId('648d7e640be5590671c2eca2-delete-device-button');
    fireEvent.click(deleteDeviceButton);

    await waitFor(()=>{
      expect(Notifications).toHaveBeenCalledWith('success', 'The device was deleted successfully');
    })    
  })
})