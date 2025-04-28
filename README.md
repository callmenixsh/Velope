# 📨 Velope - Anonymous Messages Archive

Velope is a lightweight server-side project built with **Node.js**, **Express**, and **MongoDB**.  
It handles sending, storing and retrieving anonymous messages beautifully and efficiently.

---

## 🚀 Features
- Send anonymous messages.
- Fetch messages by user name.
- Get the latest 25 messages.
- See the top 3 names to recieve most velopes of the day.

---

## 🛠️ Built With
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**

---

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/callmenixsh/velope.git
   cd velope
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```
   or
   ```bash
   node index.js
   ```

---

## 🌐 API Endpoints

| Method | Endpoint                | Description                          |
|:------:|--------------------------|--------------------------------------|
| POST   | `/messages/send`          | Send a new message                  |
| GET    | `/messages/:name`         | Get messages by name                |
| GET    | `/messages`               | Get the latest 25 messages          |
| GET    | `/top-names`              | Get today's top 3 active users      |
| GET    | `/suggest-names?q=query`  | Suggest names matching a query      |

---

## 💖 Author
**Nixsh** — *crafting projects with love*

---

> 🦋 *"Every message sent through Velope carries a story — just like every code you write carries a dream."* 🌸