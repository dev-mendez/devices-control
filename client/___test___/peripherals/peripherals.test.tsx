import '@testing-library/jest-dom'
import { render, screen, waitFor } from "@testing-library/react";
import PeripheralsPage from '@/src/app/[...peripheral]/page'
import { mockPeripheralData } from "@/__mocks__/data";


jest.mock('../../API/HTTP_req', () => ({
  __esModule: true,
  ...jest.requireActual('../../API/HTTP_req'),
  fetchMasterDevice: () => Promise.resolve({
    json: () => Promise.resolve(mockPeripheralData),
  })
}));

describe('Peripherals', () => {
  it('should display the peripherals in the list', async () => {
    const props = {
      params: {
        peripheral: [
          "perihperal",
          "648de71b7bb530564a212230"
        ]
      }
    }
    render(<PeripheralsPage {...props} />);

    await waitFor(() => {
      // mockPeripheralData.fetched_device.peripherals.forEach((peripheral) => {
      //   expect(screen.queryByTestId(peripheral._id)).not.toBeInTheDocument();
      // })
      // expect(screen.queryByText(/Master Devices/)).toBeInTheDocument();
      screen.debug();
    })

    // expect(screen.queryByText(/Master Devices/)).toBeInTheDocument();


  })
})
