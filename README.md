# VehicleManager (Frontend)

This project is the Angular frontend for the Vehicle Manager API, a complete vehicle dealership management system. It provides an intuitive user interface for managing vehicles, clients, finances, sales, and maintenance records.

| Generated with [Angular CLI](https://github.com/angular/angular-cli) version 19.2.14.

## Development server

To start a local development server:

```bash
ng serve
```

Once the server is running, open your browser and navigate to: http://localhost:4200

The app will automatically reload when you modify any source file.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## 🔒 Backend Integration

This frontend communicates with the Vehicle Manager API, a Spring Boot RESTful backend that supports:

* 🔐 JWT authentication

* 🚗 Vehicle inventory management

* 🧾 Client and sales record tracking

* 💰 Finance and transaction logs

* 🔧 Vehicle maintenance history

The API is designed for secure, scalable integration across dashboards, mobile apps, or dealer systems.

| For full backend documentation, see the Vehicle Manager API README.
