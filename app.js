const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bookRouter = require('./routes/bookRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 8000;

app.use(express.json());

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

app.use('/api/v1/books', bookRouter);
app.use('/api/v1/users', userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
