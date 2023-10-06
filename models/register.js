const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const passwordComplexity = require('joi-password-complexity');

const registerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, uniquie: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
});
registerSchema.method.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, 'sabarinathan@123', {
    expiresIn: 300,
  });
  return token;
};
const Register = mongoose.model('Register', registerSchema);

function validateRegisterData(req) {
  const schema = joi.object({
    firstName: joi.string().min(5).max(50).required(),
    lastName: joi.string().min(1).max(50).required(),
    email: joi.string().email().required(),
    password: passwordComplexity().required(),
  });
  return schema.validate(req);
  //   return joi.valid(req, schema);
}

exports.Register = Register;
exports.validate = validateRegisterData;
