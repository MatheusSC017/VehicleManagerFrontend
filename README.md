# VehicleManager (Frontend)

![License](https://img.shields.io/badge/license-MIT-blue.svg)

An intuitive user interface for managing vehicles, clients, finances, sales, and maintenance records.

---

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Configuration](#configuration)
* [Features](#features)
* [Backend Integration](#backend-integration)
* [License](#license)

---

## About the Project

This project is the Angular frontend for the Vehicle Manager API, a complete vehicle dealership management system. It provides an intuitive user interface for managing vehicles, clients, finances, sales, and maintenance records.

### Built With

* [Angular](https://angular.io/)
* [Angular CLI](https://github.com/angular/angular-cli)
* [TypeScript](https://www.typescriptlang.org/)

---

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js**: [Download and Install Node.js](https://nodejs.org/en/download/)
* **Angular CLI**: Install globally using npm:
  ```sh
  npm install -g @angular/cli
  ```

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/vehicle-manager-frontend.git
    ```
2.  **Install NPM packages**
    ```sh
    npm install
    ```
3.  **Run the development server**
    ```sh
    ng serve
    ```
    Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

---

## Configuration

The application's backend API URL can be configured in the `src/environment/environment.ts` file.

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  baseUrl: 'http://localhost:8080'
};
```

---

## Features

*   **Vehicle Management**: Add, edit, and view vehicle details including images.
*   **Client Management**: Keep track of all your clients and their information.
*   **Financing**: Manage financing details for vehicle sales.
*   **Sales Records**: Log and view sales records.
*   **Maintenance Logs**: Keep a record of vehicle maintenance history.
*   **User Authentication**: Secure login and registration for users.

---

## Backend Integration

This frontend is designed to work with the [Vehicle Manager API](https://github.com/your_username/vehicle-manager-api). The backend is a Spring Boot application that provides a RESTful API for all the features mentioned above.

Key backend features include:
*   JWT authentication
*   Scalable architecture
*   Comprehensive data models for vehicles, clients, sales, and more.

For more information, please refer to the backend project's `README.md`.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

