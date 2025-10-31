# 🌿 Qur'an Reminder Bot

A lightweight **Telegram bot** that sends daily Qur'an reminders with *Tafsir As-Sa'di (English)*.  
Built using **Node.js**, **lowdb**, and **node-cron**, designed to run easily on **Render** or any Node host.

---

## ✨ Features

- 📖 Daily Qur’an verse with English Tafsir (randomized)
- 💬 Commands:
  - `/start` – Welcome message  
  - `/help` – How to use  
  - `/verse` – Get a verse instantly
- 🕰️ Automated daily reminders (8:00 AM server time)
- 🗃️ Lightweight local database using **lowdb**
- 📜 Smart logger with color-coded console + file logs
- 🧩 Modular structure for clarity and maintainability

---

## ⚙️ Setup & Installation

### 1️⃣ Clone this repo
```bash
git clone https://github.com/ran0603/quran-reminder-bot.git
cd quran-reminder-bot
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Create a .env file
```bash
BOT_TOKEN=your_telegram_bot_token_here
```
Replace `your_telegram_bot_token_here` with your actual Telegram bot token.
You can get your bot token by talking to @BotFather on Telegram.

### 4️⃣ Run locally
```bash
npm run dev
```
or run in production:

```bash
npm start
```

---

## 🌿 Example Response
```bash
📖 Surah Al-Baqarah — Ayah 286

لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا

💬 Allah does not burden a soul beyond its capacity.
He commands His servants only with what they can bear.
```

---

## 🌸 Source: Tafsir As-Sa'di (English)
📚 Data Format Example (tafsir.json)
```bash
{
  "verses": [
    {
      "surah": "Al-Baqarah",
      "ayah": 286,
      "text": "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
      "tafsir": "Allah does not burden a soul beyond its capacity..."
    }
  ]
}
```

---

## 💡 Credits
Tafsir source: Tafsir As-Sa'di (English)

Built with ❤️ by ran0603

Powered by Node.js, lowdb, and node-telegram-bot-api

## 🛠️ License
This project is open-source under the ISC License.
You’re free to use, modify, and share it for beneficial purposes.

__🌸 “And remind, for indeed, the reminder benefits the believers.”__
(Qur’an 51:55)
