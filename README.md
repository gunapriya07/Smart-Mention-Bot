# Smart Mention Bot

A real-time group chat application with username support, built with React (Vite, TypeScript) for the frontend and Node.js/Express/MongoDB/Socket.IO for the backend.

## Features

- Real-time messaging with Socket.IO
- Group chat support (join or create any group)
- Username required for sending messages
- Messages are stored in MongoDB
- Bot replies to every message
- Responsive, modern UI

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd smart-mention-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file (optional) and set your MongoDB connection string:
   ```env
   MONGO_URL=mongodb://localhost:27017/smartmention
   PORT=3001
   ```
   If not set, defaults will be used.
4. Start the backend server:
   ```sh
   node index.js
   ```

### Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```sh
   cd smart-mention-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. (Optional) Create a `.env` file to set the backend URL:
   ```env
   VITE_API_URL=http://localhost:3001
   ```
4. Start the frontend development server:
   ```sh
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- Enter your username (required) and a group name (optional, defaults to "general").
- Send messages and see real-time updates from all users in the same group.
- Each message displays the sender's username and group.

## Project Structure

```
smart-mention-backend/
  index.js           # Express server, Socket.IO, MongoDB
  Message.js         # Mongoose message schema
  package.json

smart-mention-frontend/
  src/
    App.tsx          # Main React app
    components/      # Chat UI components
    ...
  package.json
  vite.config.ts
  ...
```

## Customization

- Change the default group by editing the frontend `App.tsx`.
- Update bot reply logic in the backend `index.js`.

## License

MIT
