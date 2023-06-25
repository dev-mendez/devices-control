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

Configure the application: If the application requires any configuration, such as setting environment variables or modifying configuration files from docker-compose-yaml.

Start the application: Open a terminal or command prompt, navigate to the directory containing the docker-compose.yml file, and run the command `docker-compose up` 🚀. This will start all the services defined in the docker-compose.yml file.

Access the application: Once all the services have started. You should be able to access the application by default through the following URLs.

**[Client:](http://localhost:3000)** 🍀

**[Server:](http://localhost:3001)** 🧰

**[API - DOC:](`https://documenter.getpostman.com/view/17604391/2s93z5AQdC)** 🔠

## Usage

***Instructions on how it works***

There are two views, one is for the Master-devices and the other one is for the Slave-devices(Peripherals).
  The navigation between those views is fast, allowing the user to go back and forward between them easily.

*MASTER-DEVICES
  -The user can add as many Master-devices as he wants.
  
  -The user can add Master-devices by clicking the button "Mount".
  
  -The user can delete "Unmount" the Master-devices only if they don't have any peripheral associates.
  
  -The user can add peripherals to the Master-devices by clicking the button "Peripherals" and then "Connect".

*PERIPHERALS
  -The user can add only ten peripherals into one Master-device.

  -The peripherals can exist in two states, Stopped or Running.
  
  -The peripherals can be created in status Stopped or Running, Stopped by default.
  
  -The user can change the status of the peripherals by clicking the button "Stop/Run".
  
  -The user can delete the peripherals by clicking the button "Disconnect", but it only will happen if the peripheral is Stopped.

## Testing

Testing is an important part of the development and maintenance of our application. We use a combination of unit, integration, and end-to-end tests to ensure the quality of our code, prevent bugs, and improve the overall reliability of the application.

### Testing Methodology

- **Unit tests / E2E test** I use Jest for this time.

### Running Tests

To run the tests for our application, follow these steps:

1. Install the dependencies by running `npm install`, `yarn install` or `pnpm install` inside of each module Client/Server.
2. Inside the Client/Server folder run the test `npm run test` or `yarn test` or `pnpm test`.
