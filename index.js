const express = require('express');
const app = express();
const mongoose = require('mongoose');
const register = require('./routes/register');
const login = require('./routes/auth');
// connecting db
mongoose
  .connect('mongodb://localhost:27017/playground')
  .then(() => console.log(`db connected...`))
  .catch((err) => console.log('error', err));

app.use(express.json());
app.use('/api/register', register);
app.use('/api/login', login);
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`connected to port ${port}`);
});
