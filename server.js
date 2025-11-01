import express from 'express'
import path from 'path'

const app = express()
const __dirname = path.resolve()

// Serve static images from /public
app.use('/images', express.static(path.join(__dirname, 'public/images')))

// Health check
app.get('/', (req, res) => {
  res.send('Quran Daily Digest Bot is running.')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Static server running on port ${PORT}`)
})
