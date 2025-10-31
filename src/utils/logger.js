import fs from 'fs'
import path from 'path'

const LOG_DIR = './logs'
const LOG_FILE = path.join(LOG_DIR, 'app.log')
const MAX_SIZE = 1 * 1024 * 1024 // 1 MB

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR)
}

/**
 * Rotate the log file if it exceeds MAX_SIZE
 */
function rotateLog() {
  if (fs.existsSync(LOG_FILE)) {
    const stats = fs.statSync(LOG_FILE)
    if (stats.size > MAX_SIZE) {
      const date = new Date().toISOString().split('T')[0]
      const newName = path.join(LOG_DIR, `app-${date}.log`)
      fs.renameSync(LOG_FILE, newName)
      fs.writeFileSync(LOG_FILE, '') // Start fresh
    }
  }
}

/**
 * Write log entry to console and file
 */
function write(level, message) {
  rotateLog()

  const timestamp = new Date().toISOString()
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`

  switch (level) {
    case 'info':
      console.log(`\x1b[36m${logMessage}\x1b[0m`)
      break
    case 'success':
      console.log(`\x1b[32m${logMessage}\x1b[0m`)
      break
    case 'warn':
      console.warn(`\x1b[33m${logMessage}\x1b[0m`)
      break
    case 'error':
      console.error(`\x1b[31m${logMessage}\x1b[0m`)
      break
    default:
      console.log(logMessage)
  }

  fs.appendFileSync(LOG_FILE, `${logMessage}\n`)
}

export const logger = {
  info: (msg) => write('info', msg),
  success: (msg) => write('success', msg),
  warn: (msg) => write('warn', msg),
  error: (msg) => write('error', msg),
}
