<h1 align="center">Tasks List</h1>
<h3 align="center">Preview live at <a href="https://tasks-list-management.netlify.app/">tasks-list-management.netlify.app</a></h1>

<p align="center">
A public tasks list - add, mark complete and remove tasks.
</p>

## Local Setup

### Using Docker

- navigate to the repo's root directory `cd tasks-list`
- build and run with compose `docker-compose up --build`
- frontend should be accessible at http://localhost:5173 and server at http://localhost:3000/api

### Without Docker

- Backend:

  - commands:
    `cd backend`
    `npm install`
    `npm run start`
  - envars:
    - PORT=3000

- Frontend:

  - commands:
    `cd frontend`
    `npm install`
    `npm run dev`
  - envars:
    - VITE_BACKEND_URL=`http://[your_host]:[server_port]/api`
