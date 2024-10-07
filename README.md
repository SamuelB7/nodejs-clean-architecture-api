# NODEJS CLEAN ARCHITECTURE API TEMPLATE

NodeJs api template made using some important principles of clean architecture.
This template also has some pre-configured features:
- Docker.
- Prisma (PostgreSQL by default).
- Routing with Fastify.
- Testing with Vitest (Unit and E2E).
- JWT authentication with role-based verification.
- GitHub workflows to run unit tests on pushes and e2e tests on pull requests.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [License](#license)
- [Contact Information](#contact-information)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/SamuelB7/nodejs-clean-architecture-api.git
    cd nodejs-clean-architecture-api
    ```

2. Copy the `.env.example` to `.env` and configure your environment variables:
    ```sh
    cp .env.example .env
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

4. Make sure to have Docker Compose installed on your machine.

5. Start the Docker containers:
    ```sh
    sudo docker compose up
    ```

6. Run database migrations:
    ```sh
    npm run prisma:migrate:deploy
    ```

## Usage

To start the server in development mode, without docker run:
```sh
npm run start:dev
```
The server will be running at http://localhost:3000

## Documentation

After starting the application, go to http://localhost:3000/documentation to check the documentation of the api endpoints

## License

This project is licensed under the MIT License

## Contact Information

For any inquiries, please contact belo.samuel@gmail.com