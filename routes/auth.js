const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const joi = require('joi');
const { Register } = require('../models/register');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await Register.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email not found');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('password Wrong');

  const token = jwt.sign({ _id: this._id }, 'sabarinathan@123', {
    expiresIn: 300,
  });
  res.status(200).send({ data: token });
});

const validate = (data) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
  return schema.validate(data);
};
module.exports = router;
