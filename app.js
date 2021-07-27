const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');

const app = express();

app.use('/api/auth', authRouter);

const PORT = config.get('port') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoConnectString'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log('Server error ', e.message);
    process.exit(1);
  }
}

start();
