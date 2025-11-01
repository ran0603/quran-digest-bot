import { Telegraf } from 'telegraf'
import dotenv from 'dotenv'
import { initDB, addUser } from './db.js'
import { registerCommands } from './handlers/commands.js'
import { scheduleDailyDigests } from './scheduler.js'
import { logger } from './utils/logger.js'

dotenv.config()

const BOT_TOKEN = process.env.BOT_TOKEN
if (!BOT_TOKEN) {
  logger.error('❌ Missing BOT_TOKEN in environment variables.')
  process.exit(1)
}

// ✅ Initialize Database before anything else
await initDB()

// ✅ Initialize bot
const bot = new Telegraf(BOT_TOKEN)

// ✅ Register bot commands
registerCommands(bot)

// ✅ Start daily digest scheduler
scheduleDailyDigests(bot)

// ✅ Handle incoming messages
bot.on('text', async (ctx) => {
  const chatId = ctx.chat.id

  // Ensure user exists in DB
  await addUser(chatId)
  logger.info(`💬 Message received from ${chatId}: ${ctx.message.text}`)
})

// ✅ Launch the bot
bot.launch()
logger.success('🤖 Quran Daily Digest Bot is now running...')

// ✅ Graceful shutdown
process.once('SIGINT', () => {
  logger.warn('SIGINT received. Stopping bot...')
  bot.stop('SIGINT')
})
process.once('SIGTERM', () => {
  logger.warn('SIGTERM received. Stopping bot...')
  bot.stop('SIGTERM')
})
