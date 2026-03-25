const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  telegramId: String,
  username: String,
  balance: { type: Number, default: 0 },
  referrals: { type: Number, default: 0 },
  referredBy: String
})

module.exports = mongoose.model('User', userSchema)