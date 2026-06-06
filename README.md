<div align="center">

# URL Shortener

A full-stack URL shortening service with user authentication and link analytics.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

## Overview

URL Shortener is a robust web application that allows users to condense long web addresses into concise, easily shareable links. Designed for both anonymous users and registered accounts, the platform offers core URL shortening alongside detailed link analytics, tracking visits and visitor IP addresses over time. The project serves as a functional utility while demonstrating full-stack engineering principles, RESTful API design, and modern frontend state management.

## Demo

> Demo assets not found in codebase.

## Highlights

* Implemented a custom MVC-inspired backend architecture using Express and Mongoose.
* Designed a responsive Single Page Application (SPA) utilizing React 19 and Tailwind CSS.
* Built local storage-based session management integrated with user authentication.
* Developed scalable API endpoints for URL generation, redirection, and tracking analytics.
* Engineered secure data models with input validation using `validator` to prevent malformed URLs and invalid emails.
* Integrated detailed access logging to record IP addresses and timestamps for each shortened URL visit.

## Features

### URL Management
* Generate unique short URLs utilizing the `shortid` algorithm.
* Automatic redirection from short links to original long URLs.
* Comprehensive analytics tracking total visits and historical access logs (Date and IP).
* Input validation ensuring only correctly formatted URLs are processed.

### Authentication & Authorization
* Secure user registration and login workflows.
* Custom local storage mechanism for maintaining user sessions.
* Seamless user profile dashboard.
* Profile management including updating credentials and account deletion.

### User Experience
* Modern, responsive UI built with Tailwind CSS.
* Interactive modal-based authentication interface.
* Logged-in users can view and manage their personal history of shortened URLs.

## Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js, CORS |
| **Database** | MongoDB, Mongoose |
| **Utilities** | shortid, validator, dotenv |

## Architecture

The project implements a decoupled client-server architecture. The frontend is a Single Page Application (SPA) built with React and styled with Tailwind CSS, communicating via RESTful APIs to the backend. The backend utilizes Node.js and Express in an MVC (Model-View-Controller) structure, managing business logic in controllers and routing logic separately. MongoDB serves as the persistent data store, integrated via the Mongoose ODM to enforce schema validation and relationships between Users and URLs.

## Project Structure

```text
.
├── url-frontend/
│   ├── src/
│   │   ├── Components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── url-backend/
    ├── controller/
    │   ├── url.js
    │   └── user.js
    ├── model/
    │   ├── url.js
    │   └── users.js
    ├── routes/
    │   ├── url.js
    │   └── user.js
    ├── app.js
    ├── startServer.js
    └── package.json
```

## Installation

**1. Clone the repository and navigate to the project directory:**
```bash
git clone <repository-url>
cd URL-shortner
```

**2. Install Frontend Dependencies:**
```bash
cd url-frontend
npm install
```

**3. Install Backend Dependencies:**
```bash
cd ../url-backend
npm install
```

## Environment Variables

Create a `.env` file in the `url-backend` directory with the following variables:

| Variable | Description |
| :--- | :--- |
| `MONGO_URI` | MongoDB connection string |
| `PORT` | Port number for the backend server |

## Running Locally

**Start the Backend Server:**
```bash
cd url-backend
npm start
```

**Start the Frontend Development Server:**
```bash
cd url-frontend
npm run dev
```

## Available Scripts

### Frontend (`url-frontend`)
* `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
* `npm run build`: Compiles the React application into static assets for production.
* `npm run lint`: Runs ESLint to analyze the codebase for potential errors and stylistic issues.
* `npm run preview`: Bootstraps a local web server to preview the production build.

### Backend (`url-backend`)
* `npm start`: Starts the backend Express server using `nodemon` for automatic restarts upon file modifications.

## Performance & Security

* **Input Validation**: Employs the `validator` library across both user and URL controllers to strictly validate email addresses and URL structures before database insertion.
* **Database Indexing & Unique Constraints**: Utilizes MongoDB's unique constraints for user emails and short URLs to prevent data duplication.
* **CORS Configuration**: Implements the `cors` middleware to control resource sharing and cross-origin request handling.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your proposed changes. Ensure all code adheres to the existing styling and includes relevant updates to documentation.

## License

ISC Licens