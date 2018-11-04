# DD9App

DD9 Extranet V2 - a software contractor management application

## Build and Run

Requires NodeJS

Requires external DB import scripts and keys

First, install dependencies for the server and the client:
```bash
npm install
cd client
npm install
```

#### To run the development server 

In the root directory:
```bash 
npm run dev
```

Navigate to `localhost:3000`

#### To build and run a production environment locally:

In the client directory
```bash
npm run build
```

In the server, modify the variables.env `NODE_ENV` to 'production', then:
```bash
npm run start
```

Navigate to the localhost port specified in the app entry point: start.js, `localhost:5000` by default