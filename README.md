# Simple Journal App

A simple journal application with React frontend and Node.js/Express backend.

## Structure

*   `frontend/`: React + TypeScript (Vite)
*   `backend/`: Node.js + Express + TypeScript

## How to Run

### Prerequisites

*   Node.js (v14 or higher)

### Setup & Run

1.  **Backend** (Terminal 1)
    ```bash
    cd backend
    npm install
    npm run dev
    ```
    Server will start at `http://localhost:3000`.

2.  **Frontend** (Terminal 2)
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    App will start at `http://localhost:5173`.

## Features

*   View list of journals
*   Create new journal
*   Edit existing journal
*   Delete journal
*   Data is saved in `backend/data/journals.json`

## Future Expansion

See [EXPANSION.md](./EXPANSION.md) for details on how to convert this into a Desktop or Mobile application.
