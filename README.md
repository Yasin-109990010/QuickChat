README.md
# QuickChat

A simple real-time chat application built with Node.js, Socket.IO, and React.
The project is split into a `server` folder containing the Socket.IO backend
and a `client` folder with the React interface. You can set a custom display
name directly in the chat UI and create or join arbitrary chat rooms.

## Features
- Real-time messaging with Socket.IO
- Customizable display names
- Join or create separate chat rooms on the fly

## Getting Started

### Prerequisites
- Node.js v18+ recommended
- npm (comes with Node) or Yarn
- (optional) VS Code for development

### Server
```bash
cd server
npm install
npm start
```

### Client
```bash
cd client
npm install
npm start
```

Visit http://localhost:3000 to view the client UI. The Socket.IO backend runs on http://localhost:4000 by default.

----
