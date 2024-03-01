const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  book: {
    typeof: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  paymentStatus: {
    type: String,
    default: 'unpaid',
  },
  deliveryStatus: {
    type: String,
    default: 'pending',
    enum: ['pending', 'shipped', 'out for delivery', 'delivered', 'cancel'],
  },
  orderedItems: {
    type: Number,
    default: 1,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
