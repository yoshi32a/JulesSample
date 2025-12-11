# Journal App Expansion Guide

Currently, this app is a web application consisting of a React frontend and an Express backend.
Here is how to expand it to Desktop and Mobile platforms.

## Desktop App (Electron)

To wrap this application as a desktop app using Electron:

1.  **Initialize Electron in the project root (or a new `desktop` folder)**
    ```bash
    npm install --save-dev electron
    ```

2.  **Create `main.js` (Electron entry point)**
    This script should create a browser window and load the frontend.
    For production, it should spawn the backend server as a child process or embed the backend logic directly (if converting to SQLite/local file access directly from Electron).

    ```javascript
    const { app, BrowserWindow } = require('electron');
    const path = require('path');

    function createWindow () {
      const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true
        }
      });

      // Load the built frontend
      win.loadFile('frontend/dist/index.html');
      // Or load localhost:3000 if running the server separately
    }

    app.whenReady().then(createWindow);
    ```

3.  **Data Persistence**
    Since the current backend writes to `backend/data/journals.json`, packaging this requires care.
    In a true desktop app, you should write to `app.getPath('userData')` instead of the project folder.

## Mobile App (Capacitor)

To wrap the frontend as a mobile app:

1.  **Install Capacitor in the `frontend` directory**
    ```bash
    cd frontend
    npm install @capacitor/core @capacitor/cli
    npx cap init
    ```

2.  **Build the frontend**
    ```bash
    npm run build
    ```

3.  **Add Platforms**
    ```bash
    npm install @capacitor/android @capacitor/ios
    npx cap add android
    npx cap add ios
    ```

4.  **Sync**
    ```bash
    npx cap sync
    ```

5.  **Backend Considerations**
    Mobile apps cannot easily run a Node.js Express server. You have two options:
    *   **Host the Backend:** Deploy the `backend` to a cloud server (Heroku, Vercel, AWS, etc.) and update the `API_URL` in `frontend/src/api.ts` to point to the public URL.
    *   **Local Storage:** Refactor `frontend/src/api.ts` to use local storage (Capacitor Filesystem API or SQLite plugin) instead of calling an API, effectively making the app offline-first.

## Running the Web App

1.  **Backend**
    ```bash
    cd backend
    npm install
    npm run dev
    ```

2.  **Frontend**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
