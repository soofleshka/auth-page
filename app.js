const express = require('express');
const path = require('path');
const config = require('config');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', authRouter);

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || config.get('port') || 5000;

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
