const express = require('express');
const router = express.Router();
const { Register, validate } = require('../models/register');
const bcrypt = require('bcrypt');
const Token = require('../models/token');
const crypto = require('crypto');
const sendEmail = require('../utils/emailsender');

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const isEmailFound = await Register.findOne({ email: req.body.email });
  if (isEmailFound && Object.keys(isEmailFound).length > 1)
    return res.status(400).send('email already registered');

  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashedpassword = await bcrypt.hash(req.body.password, salt);

  let register = new Register({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedpassword,
  });
  register = await register.save();
  const token = new Token({
    userId: register._id,
    token: crypto.randomBytes(3).toString('hex'),
  });
  await token.save();
  const url = `http://localhost:8080/register/${register._id}/verify/${token.token}}`;
  await sendEmail(register.email,'verify email',url);
  res.status(200).send('Registered successfully');
});

module.exports = router;
