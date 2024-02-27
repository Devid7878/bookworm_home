const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    // validate: [validator.isAlpha, 'user name must only contain characters']
  },
  email: {
    type: String,
    required: [true, 'A user must have a email'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email!'],
  },
  photo: String,
  role: {
    type: String,
    default: 'buyer',
    enum: ['buyer', 'seller', 'admin'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password!'],
    select: false,
    minlength: [6, 'A password must have more or equal then 6 characters'],
    // validate: [validator.isAlpha, 'user name must only contain characters']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm a password!'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords do not match!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfterTokenGenerated = async function (
  jwtCreatedAt
) {
  if (this.passwordChangedAt) {
    const passwordChangedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return jwtCreatedAt < passwordChangedTimestamp;
  }

  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
