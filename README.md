# File Upload Project

This project is a file upload application with features to view, download, and delete files. The frontend is built with Vite and React, while the backend is developed using Node.js and Express.

## Features

- User registration and login with username and password
- File upload functionality with unique 6-digit code generation
- File storage on the server for future retrieval
- View list of uploaded files for each user
- Download files using a secure URL with a 6-digit code
- Permanent file deletion from the user's profile

## Project Structure

The project is organized into two main directories:

- `client`: Contains the frontend code built with Vite and React.
- `server`: Contains the backend code implemented using Node.js and Express.

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-name>

# Install frontend dependencies
1. cd client
2. npm install

# Install backend dependencies

cd server
npm install

# Start the frontend server
1. cd client
2.  npm run dev

# Start the backend server
1. cd server
2. node index or  nodemon index



Access the application:

Open your web browser and visit http://127.0.0.1:5173/ to access the frontend.

# Dependencies

# Frontend:

1. Vite: Fast frontend build tool
2. React: JavaScript library for building user interfaces
3. Axios: Promise-based HTTP client for making API requests
4. React Router: Declarative routing for React applications
5. Other dependencies specified in client/package.json

# Backend:

1. Express: Web application framework for Node.js
2. Multer: Middleware for handling file uploads
3. Mongoose: MongoDB object modeling for Node.js
4. Other dependencies specified in server/package.json

