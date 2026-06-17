# Betkify Project

Betkify is a full-stack application designed to handle user form submissions, including creation, viewing, editing, and deletion of records. It features a modern React frontend communicating with a Node.js/Express backend API.

## 🚀 Overview

This project provides a complete solution for managing forms data. The architecture consists of:
*   **Frontend:** A responsive Single Page Application built with React (using Vite).
*   **Backend:** A RESTful API built with Node.js and Express to handle form submissions, retrieval, updates, and deletions.
*   **Database:** A serverless PostgreSQL database managed by Neon for scalable data storage.

## 🛠️ Technology Stack

- **Frontend:** React, JavaScript (using Vite)
- **Backend:** Node.js, Express
- **Database:** Neon (PostgreSQL Serverless)
- **Styling:** CSS Modules / Inline Styles

## 🏗️ Project Structure

The project is organized into two main parts: `frontend/` and `backend/`.

```
form-app/
├── backend/
│   ├── db.js          # Database connection logic (Neon setup)
│   ├── package.json
│   └── server.js      # Express server entry point
└── frontend/
    ├── src/           # React source code
    │   ├── App.jsx    # Main application component
    │   └── ...
    ├── public/
    ├── package.json
    └── vite.config.js
```

## ⚙️ Setup and Installation

### Prerequisites

- Node.js (for backend)
- npm or yarn

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set environment variables (e.g., database connection string) as needed in a `.env` file.

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## ☁️ Deployment on Render

This project is designed for easy deployment on **Render**.

### Backend Deployment

1.  Ensure your backend code is ready (e.g., environment variables are set).
2.  Connect your GitHub repository to Render.
3.  Create a new Web Service, pointing it to the `backend` directory and specifying the start command (e.g., `node server.js`).

### Frontend Deployment

1.  Ensure your frontend build process is configured correctly in `vite.config.js`.
2.  Connect your GitHub repository to Render.
3.  Create a new Static Site Service, pointing it to the `frontend` directory and specifying the build command (e.g., `npm run build`).

## 💾 Database Details (Neon)

The application uses **Neon**, a serverless PostgreSQL database provider. This allows for scalable, pay-as-you-go database management without managing servers directly. The connection string is configured in `backend/db.js`.
