const mongoose = require('mongoose');

const forgotPasswordSchema = new mongoose.Schema({
  id: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  active: { type: Boolean, default: true },
  expiresAt: { type: Date, default: Date.now, index: { expires: '15m' } }
});

module.exports = mongoose.model('ForgotPassword', forgotPasswordSchema);
