// server.js
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { logger } from './src/utils/logger.js'
import './src/bot.js' // Import your bot (starts it automatically)

dotenv.config()

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Optional: serve static images if you add them later
app.use('/images', express.static(path.join(__dirname, 'public/images')))

// Health check route for Render
app.get('/', (req, res) => {
  res.send('🕊️ Quran Reminder Bot is running and connected.')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  logger.info(`🌿 Express server listening on port ${PORT}`)
})
