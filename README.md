# QuickChat

QuickChat is a lightweight real-time chat application built with Node.js, Express,
Socket.IO, and React. The repository contains a Socket.IO server in the
`server/` directory and a React client in `client/`. Users can choose a display
name, create or join rooms, and start chatting instantly.

## Features
- Real-time messaging with Socket.IO
- Create or join any number of chat rooms
- Custom display names for each session
- Message timestamps for additional context

## Project Structure
```
/
├── server   # Express + Socket.IO backend
└── client   # React front-end
```

## Getting Started

### Prerequisites
- Node.js v18+ and npm (or Yarn)
- (optional) VS Code for development

### Running the Server
```bash
cd server
npm install
npm start
```
The server listens on `http://localhost:4000` by default. Set the `PORT`
environment variable to change the port.

### Running the Client
```bash
cd client
npm install
npm start
```
Open `http://localhost:3000` in your browser to use the client. The client
connects to the Socket.IO server at `http://localhost:4000`; update
`client/src/components/Chat.js` if your server URL differs.

### Building for Production
```bash
cd client
npm run build
```
The optimized build is generated in `client/build/` and can be served by any
static file host.

## Contributing
Pull requests are welcome! Feel free to open an issue to report bugs or suggest
new features.

---

