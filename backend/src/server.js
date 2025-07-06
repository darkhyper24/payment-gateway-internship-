const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./database/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.get('/', (req, res) => {
  res.send('Welcome to Payment Gateway API');
});

app.use('/api/auth', authRoutes);

// TODO: Add your payment gateway routes here
// app.use('/api/payments', paymentRoutes);
// app.use('/api/transactions', transactionRoutes);
// app.use('/api/users', userRoutes);


app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});