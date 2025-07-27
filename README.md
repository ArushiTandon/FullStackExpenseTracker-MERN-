# Full Stack Expense Tracker (MERN)

A full stack expense tracker application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project allows users to manage their expenses and incomes, visualize financial data, and securely authenticate.

## Features
- User authentication (sign up, login)
- Add, edit, and delete expenses and incomes
- Dashboard with charts and summaries
- Profile photo upload
- Download expense reports
- Responsive UI

## Tech Stack
- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT

## Project Structure
```
FullStackExpenseTracker/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── util/
│   ├── package.json
│   └── server.js
├── frontend/
│   └── expense_tracker_fs/
│       ├── public/
│       ├── src/
│       ├── package.json
│       └── vite.config.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add your MongoDB URI and JWT secret:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend/expense_tracker_fs
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```

### Usage
- Open your browser and go to `http://localhost:5173` (or the port shown in the terminal) to use the app.
- Register a new account or log in.
- Add, edit, or delete expenses and incomes.
- View charts and summaries on the dashboard.

## Folder Overview
- `backend/` - Express server, API routes, controllers, models, and middleware
- `frontend/expense_tracker_fs/` - React app source code

## License
This project is licensed under the MIT License.

---

*Happy tracking!*
