# 🤖 Discord Auto-Ban Bot

A simple yet powerful Discord bot that **automatically bans any user** who sends a message in a designated “trap” channel.
Ideal for keeping your server safe from **spammers**, **raiders**, or **compromised accounts**.

---

## ⚠️ Important Warning

This bot will **instantly ban** anyone who posts in the configured trap channel — no confirmation, no second chance.
Be sure to **clearly inform your members** before enabling it.

---

## ✨ Features

* 🔨 **Instant Auto-Ban** — Automatically bans users who send messages in the trap channel.
* 🗑️ **Smart Cleanup** — Deletes all messages sent by that user in the last **5 minutes**, across all text channels.
* 📝 **Detailed Logging** — Prints clear logs to the console for monitoring bot actions and errors.
* 🛡️ **Permission & Error Handling** — Checks for necessary permissions before attempting message deletion or bans.

---

## ⚙️ Setup

1. Clone this repository and install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with the following:

   ```bash
   BOT_TOKEN=your_discord_bot_token_here
   TRAP_CHANNEL_ID=your_trap_channel_id_here
   ```

3. Run the bot:

   ```bash
   node index.js
   ```

4. Watch the console for logs confirming the bot is active and monitoring your trap channel.

---

## 🧠 How It Works

1. The bot listens for new messages.
2. If a message is detected in the trap channel:

   * It deletes all messages from that user posted within the last 5 minutes.
   * It bans the user immediately.
3. All actions are logged for transparency and debugging.

---

## 🧾 Requirements

* **Node.js 18+**
* **discord.js v14+**
* Bot permissions:

  * `Ban Members`
  * `Manage Messages`
  * `View Channels`
  * `Read Message History`

---

## 🧰 Notes

* The bot fetches only the **100 most recent messages** per channel when cleaning up.
* You can adjust the cleanup duration in the code (`FIVE_MINUTES`) if needed.
* Use this responsibly — it’s meant for **security traps**, not general moderation.

---

## 📜 License

This project is open-source and available under the **MIT License**.
