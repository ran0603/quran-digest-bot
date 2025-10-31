import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'path'
import { fileURLToPath } from 'url'
import { logger } from './utils/logger.js'

// ✅ Resolve paths
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const file = path.join(__dirname, '../..', 'db.json')

// ✅ Initialize adapter and db
const adapter = new JSONFile(file)
const db = new Low(adapter, { users: [] })

// ✅ Initialize DB (creates file if missing)
export async function initDB() {
  try {
    await db.read()
    db.data ||= { users: [] }
    await db.write()
    logger.info('📚 Database initialized successfully.')
  } catch (err) {
    logger.error('❌ Failed to initialize database:', err)
  }
}

// ✅ Add user if not exists
export async function addUser(userId) {
  try {
    await db.read()
    const exists = db.data.users.some((u) => u.id === userId)
    if (!exists) {
      db.data.users.push({
        id: userId,
        active: true,
        joinedAt: new Date().toISOString(),
      })
      await db.write()
      logger.info(`✅ Added user ${userId}`)
    } else {
      logger.info(`ℹ️ User ${userId} already exists.`)
    }
  } catch (err) {
    logger.error('❌ Error adding user:', err)
  }
}

// ✅ Deactivate or remove user
export async function removeUser(userId) {
  try {
    await db.read()
    const before = db.data.users.length
    db.data.users = db.data.users.filter((u) => u.id !== userId)
    await db.write()
    const after = db.data.users.length
    logger.info(
      before !== after
        ? `🚫 Removed user ${userId}`
        : `⚠️ User ${userId} not found.`
    )
  } catch (err) {
    logger.error('❌ Error removing user:', err)
  }
}

// ✅ Get all active users
export async function getUsers() {
  await db.read()
  return db.data.users.filter((u) => u.active !== false)
}

// ✅ Toggle user active state
export async function setUserActive(userId, state = true) {
  try {
    await db.read()
    const user = db.data.users.find((u) => u.id === userId)
    if (user) {
      user.active = state
      await db.write()
      logger.info(`🔁 Set user ${userId} active=${state}`)
    }
  } catch (err) {
    logger.error('❌ Error updating user state:', err)
  }
}

// ✅ General utility to get raw DB object (for advanced queries)
export async function getDB() {
  await db.read()
  return db.data
}
