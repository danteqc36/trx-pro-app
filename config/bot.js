const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true })

bot.onText(/\/start (.+)/, (msg, match) => {
  const ref = match[1].replace('ref_', '')

  bot.sendMessage(msg.chat.id, "Bienvenido 🚀", {
    reply_markup: {
      inline_keyboard: [[
        {
          text: "Abrir App",
          web_app: {
            url: `https://TU_DOMINIO.com?ref=${ref}`
          }
        }
      ]]
    }
  })
})

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Bienvenido 🚀", {
    reply_markup: {
      inline_keyboard: [[
        {
          text: "Abrir App",
          web_app: {
            url: `https://TU_DOMINIO.com`
          }
        }
      ]]
    }
  })
})