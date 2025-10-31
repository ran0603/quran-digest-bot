// commands.js
import { messages } from './messages.js'
import { randomVerse } from './../utils/randomVerse.js'

/**
 * Registers bot commands
 * @param {TelegramBot} bot
 */
export const registerCommands = (bot) => {
  // /start command
  bot.command('start', async (ctx) => {
    await ctx.replyWithMarkdown(messages.start)
  })

  // /help command
  bot.command('help', async (ctx) => {
    await ctx.replyWithMarkdown(messages.help)
  })

  // /verse command
  bot.command('verse', async (ctx) => {
    try {
      await ctx.reply(messages.loading)
      const verse = await randomVerse()

      if (!verse) {
        await ctx.reply(messages.error)
        return
      }

      const text = `📖 *${verse.surah}* — Ayah ${verse.ayah}\n\n${verse.text}\n\n💬 ${verse.tafsir}${messages.footer}`
      await ctx.replyWithMarkdown(text)
    } catch (error) {
      console.error('Error fetching verse:', error)
      await ctx.reply(messages.error)
    }
  })
}
