import cron from 'node-cron'
import { getUsers } from './db.js'
import { randomVerse } from './utils/randomVerse.js'
import { logger } from './utils/logger.js'

/**
 * Schedules daily Qur'an reminders.
 * @param {TelegramBot} bot - The Telegram bot instance.
 */
export function scheduleDailyReminders(bot) {
  // ⏰ Runs every day at 8:00 AM (server time)
  cron.schedule('0 8 * * *', async () => {
    logger.info('🕊️ Sending daily Qur’an reminder...')

    const users = await getUsers()
    if (!users || users.length === 0) {
      logger.warn('⚠️ No active subscribers found.')
      return
    }

    const verse = randomVerse()

    for (const user of users) {
      try {
        if (verse.image) {
          await bot.sendPhoto(user.id, verse.image, {
            caption: `📖 *${verse.ayah}*\n_${verse.reference}_\n\n💭 ${verse.tafsir}`,
            parse_mode: 'Markdown',
          })
        } else {
          await bot.sendMessage(
            user.id,
            `📖 *${verse.ayah}*\n_${verse.reference}_\n\n💭 ${verse.tafsir}`,
            { parse_mode: 'Markdown' }
          )
        }
        logger.info(`📩 Reminder sent to ${user.id}`)
      } catch (err) {
        logger.error(`❌ Failed to send reminder to ${user.id}: ${err.message}`)
      }
    }

    logger.success(`✅ Sent daily reminder to ${users.length} subscribers.`)
  })

  logger.info('🕰️ Daily reminder scheduler initialized.')
}
