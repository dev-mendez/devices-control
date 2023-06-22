import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PeripheralsPage from '@/src/app/[...peripheral]/page'
import { mockPeripheralData } from "@/__mocks__/data";
import { Notifications } from '@/components/common/Notifications';

jest.mock('next/navigation', () => ({
  __esModule: true,
  ...jest.requireActual('next/navigation'),
  useParams: () => ({ id: '1234' })
}))
jest.mock('../../API/HTTP_req', () => ({
  __esModule: true,
  ...jest.requireActual('../../API/HTTP_req'),
  fetchMasterDevice: (id: string) => Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockPeripheralData),
  }),
  deletePeripheral: (_id: string) => Promise.resolve({ ok: true })
}));
jest.mock('../../components/common/Notifications')

describe('Peripherals', () => {
  it('should display the peripherals in the list', async () => {

    render(<PeripheralsPage />);

    await waitFor(() => {
      mockPeripheralData.fetched_device.peripherals.forEach((peripheral) => {
        expect(screen.queryByTestId(peripheral._id)).toBeInTheDocument();
      })
    })
  })

  it('should disconnect the peripheral', async () => {

    render(<PeripheralsPage />);

    await waitFor(() => {
      expect(screen.queryByTestId('disconnect-button-648de7587bb530564a21224e')).toBeInTheDocument();
    })

    const statusButton = screen.getByTestId('disconnect-button-648de7587bb530564a21224e');
    fireEvent.click(statusButton);

    await waitFor(() => {
      expect(screen.queryByTestId('648de7587bb530564a21224e')).not.toBeInTheDocument();
    })

    expect(Notifications).toBeCalledWith("success", "Succesfully disconnected!");
  })

  it('should not disconnect the peripheral if the status is connected', async () => {

    render(<PeripheralsPage />);

    await waitFor(() => {
      expect(screen.queryByTestId('disconnect-button-648de75b7bb530564a212257')).toBeInTheDocument();
    })

    const statusButton = screen.getByTestId('disconnect-button-648de75b7bb530564a212257');
    fireEvent.click(statusButton);

    expect(Notifications).toBeCalledWith("error", "You must stop the peripheral first");
  })
})