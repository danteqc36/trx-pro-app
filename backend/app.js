require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("DB conectada"))

const User = require('./models/User')

// Registrar usuario
app.post('/user', async (req, res) => {
  const { telegramId, username, ref } = req.body

  let user = await User.findOne({ telegramId })

  if (!user) {
    user = await User.create({
      telegramId,
      username,
      referredBy: ref || null
    })

    // sumar referido
    if (ref) {
      await User.updateOne(
        { telegramId: ref },
        { $inc: { referrals: 1, balance: 1 } }
      )
    }
  }

  res.json(user)
})

// Minar
app.post('/mine', async (req, res) => {
  const { telegramId } = req.body

  const reward = Math.random() * 0.3

  const user = await User.findOneAndUpdate(
    { telegramId },
    { $inc: { balance: reward } },
    { new: true }
  )

  res.json(user)
})

// Ranking
app.get('/top', async (req, res) => {
  const users = await User.find().sort({ balance: -1 }).limit(10)
  res.json(users)
})

app.listen(3000, () => console.log("Servidor ON"))