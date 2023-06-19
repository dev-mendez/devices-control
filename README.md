# Title: MORE'S CONTROL

***Short description of the project.***

Focussed on the micromanagement of electronic devices that can provide a sort of service to surrounding peripherals.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

***Instructions on how to install the project.***

Install Docker and Docker Compose: Make sure you have Docker and Docker Compose installed on your system. You can find instructions on how to install them on the Docker website.

Download the application: Download the application’s source code from its repository or website. Make sure you have the docker-compose.yml file, which defines the services and their configurations.

Configure the application: If the application requires any configuration, such as setting environment variables or modifying configuration files, follow the instructions provided by the application’s documentation.

Start the application: Open a terminal or command prompt, navigate to the directory containing the docker-compose.yml file, and run the command docker-compose up. This will start all the services defined in the docker-compose.yml file.

Access the application: Once all the services have started, you should be able to access the application.

- Server application: http://localhost:3001

- Client application: http://localhost:3000

- API Rest documentation: ````http://localhost:3000/swagger```

## Usage

***Instructions on how to use the project.***

There are two views, one is for the Master-devices and the other one is for the Slave-devices(Peripherals).
  The navigation between those views is fast, allowing the user to go back and forward between them easily.

Master-devices
  The user can add as many Master-devices as he wants.
  The user can add Master-devices by clicking a button "Mount".
  The user can delete "Unmount" the Master-devices only if they don't have any peripheral asociate.
  The user can add peripherals to the Master-devices by clicking a button "Peripherals" and then "Connect".
Peripherals
  The user can add only ten peripherals into one Master-device.
  The peripherals can exist in two status, Stopped or Running.
  The peripherals can be created in status Stopped or Running, Stopped by default.
  The user can change the status of the peripherals by clicking a button "Stop/Run".
  The user can delete the peripherals by clicking a button "Disconnect", but it only will happen if the peripheral is Stopped.

## Testing

Testing is an important part of the development and maintenance of our application. We use a combination of unit, integration, and end-to-end tests to ensure the quality of our code, prevent bugs, and improve the overall reliability of the application.

### Testing Methodology

- **Unit tests** are used to test individual units of code in isolation. We use Jest for this time.

### Running Tests

To run the tests for our application, follow these steps:

1. Install the dependencies by running `npm install`, `yarn install` or `pnpm install`.
2. Inside the client folder run the unit tests by running `npm run test` or `yarn test` or `pnpm test`.
