# File Sharing

## Project Overview
Secure file sharing web application. It allows users to upload, download & share files with others.

---

## System Requirements
Ensure your system meets the following requirements before proceeding:

- **Node.js**: v21.2.0 or higher
- **npm/yarn**: Latest version
- **MongoDB**: v4.0 or higher (for backend database)
- **Browser**: Chrome/Edge/Firefox (latest version)
- **Operating System**: Windows/Linux/MacOS (any with appropriate Node.js support)

---

## Installation Instructions
In Github, client & server reside under the same directory, so just clone the parent one.
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url.git

### Backend (BE)

1. Change directory:
    ```bash
    cd server
2. Install dependencies:
   ```bash
   npm install
3. Copy all env's from env.example, create .env & paste all here
4. Configure firebase json file, you need to download your firebase json file & paste into server/utils. This step is required, otherwise, files will not be uploaded
5. Start the backend server:
    ```bash
   npm run dev

Make sure to copy all envs from env.example to .env

### Frontend (FE)

1. Change directory:
    ```bash
    cd client
2. Install dependencies:
   ```bash
   npm install
3. Start the clinet:
    ```bash
   npm run dev

## Running Instructions
Once setup is done, db string is updated in the env, we are ready to go, we can now start our server
### Backend (BE)
-  Start the backend server: (starts at 3000 PORT)
    ```bash
   npm run dev

### Frontend (FE)
-  Start the backend server:
    ```bash
   npm run dev

## DB Schema
![Image Alt Text](./abnormal_security_db.drawio.png)
