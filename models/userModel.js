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
  phone: {
    type: Number,
    required: [true, 'A user must have a phone number'],
    unique: true,
    validate: [validator.isMobilePhone, 'Please enter a valid phone number!'],
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
    default: false,
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

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
