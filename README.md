Absolutely! Here's a polished and engaging `README.md` tailored for your library/borrowing system project, based on everything you've built so far:

---

# 📚 Library Management System

A modern full-stack web application for managing books, tracking borrow records, and visualizing borrow summaries — built with **React**, **TypeScript**, **Tailwind CSS**, **MongoDB**, and **Express**.

---

## ✨ Features

* 🔍 **Browse & Edit Books** – View, update, or manage books with ease.
* 🧾 **Borrow Books** – Select quantity and due date using a responsive modal with a calendar picker.
* 📊 **Borrow Summary** – Aggregated view of total borrow counts per book.
* 🌐 **RESTful API** – Built using Express & Mongoose with advanced MongoDB aggregation.
* 🧠 **State Management** – Powered by **Redux Toolkit Query** for data fetching and caching.
* 🎨 **Beautiful UI** – Styled using **Tailwind CSS**, **Radix UI**, and custom component libraries.
* 🌙 **Dark Mode** – Theming support via `next-themes` (when applicable).
* 🔔 **Toasts & Feedback** – User actions trigger feedback using `sonner`.

---

## 🛠️ Tech Stack

**Frontend**

* React (with Vite)
* TypeScript
* Tailwind CSS + DaisyUI (customized)
* React Hook Form
* RTK Query
* Lucide Icons
* Sonner (toasts)
* date-fns + Radix Popover + Custom Calendar

**Backend**

* Node.js + Express
* MongoDB + Mongoose
* RESTful API with Aggregation Pipelines

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/kyoChiwow/Level2-Assignement4-Frontend.git
cd Level2-Assignement4-Frontend
```

### 2. Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

### 3. Environment Setup

Create `.env` files in both `/client` and `/server` as needed:

#### For Backend (`server/.env`)

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### 4. Run the App

#### Start Backend

```bash
cd server
npm run dev
```

#### Start Frontend

```bash
cd client
npm run dev
```

---

## 📦 Project Structure

```
📁 client
 ┣ 📂 components/ui        # Custom and Radix-wrapped components
 ┣ 📂 pages                # Page-level components (EditBook, BorrowSummary, etc.)
 ┣ 📂 redux/baseApi        # RTK Query API slices
 ┣ 📜 main.tsx             # React root entry

📁 server
 ┣ 📂 Models               # Mongoose models (Book, Borrow)
 ┣ 📂 routes               # Express route handlers
 ┣ 📂 utils                # Error handling utilities
 ┣ 📜 index.ts             # Express server entry
```

---

## 📈 Example Aggregation Output

> `/borrow-summary` endpoint returns:

```json
[
  {
    "book": {
      "title": "The Pragmatic Programmer",
      "isbn": "9780135957059"
    },
    "totalQuantity": 7
  },
  ...
]
```

---

## 🧪 Future Improvements

* ✅ Borrow return tracking
* ✅ User login & authentication
* 📅 Due date reminders
* 📚 Pagination, search & filters
* 📄 PDF/CSV export of borrow summary
* 📲 Mobile responsiveness enhancements

---

## 👤 Author

**kyoChiWow**
[GitHub](https://github.com/kyoChiwow)

---
