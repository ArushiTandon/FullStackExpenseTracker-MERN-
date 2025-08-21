const express = require('express');
const path = require('path');
const passport = require('./middlewares/auth');
const cors = require('cors');
const connectDB = require('./util/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();


//Routes
const authRoutes = require('./routes/authRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const password = require('./routes/passwordRoutes');


app.use('/api/v1/user', authRoutes);
app.use('/api/v1/income', incomeRoutes);
app.use('/api/v1/expense', expenseRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/password', password);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')) )


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});