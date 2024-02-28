const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

notificationSchema.pre(/^find/, async function (next) {
  this.populate({
    path: 'userId',
    select: '-__v -passwordChangedAt',
  });

  next();
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
