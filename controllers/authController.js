const User = require('../models/User');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.validateRegisterParams = [
  check('email', 'Incorrect email').isEmail(),
  check('password', 'Minimal lenght for password is 6 sign').isLength({
    min: 6,
  }),
];

exports.validateLoginParams = [
  check('email', 'Incorrect email').normalizeEmail().isEmail(),
  check('password', 'Enter password').exists(),
];

exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid registration data',
      });
    }

    const { email, password } = req.body;

    const candidate = await User.findOne({ email });
    if (candidate) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    const token = generateToken(user.id);

    res.status(201).json({ message: 'User created', token, userID: user.id });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid login data',
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'User with this email not exists' });
    }

    const isMatchPasswords = await bcrypt.compare(password, user.password);
    if (!isMatchPasswords) {
      return res
        .status(400)
        .json({ message: 'Wrong password, please try again' });
    }

    const token = generateToken(user.id);

    res.json({ token, userID: user.id });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, config.get('jwtPrivateKey'), {
    expiresIn: '1h',
  });
};
