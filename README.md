# 🌐 Sumpha URL Shortener

A modern, fast and beautifully designed **URL Shortener** built with **React + Django REST API**.  
Features glassmorphism UI, QR code generation, copy-to-clipboard toasts, analytics dashboard, and smooth animations.

---

## 🚀 Features

- 🔗 Shorten any long URL
- ✨ Modern glass UI
- 📊 Analytics Dashboard (click stats chart)
- 📥 QR Code generation + download
- 📋 Copy shortcode with toast
- ❌ Delete shortened links
- 🎨 Animated UI with Framer Motion
- 🧭 React Router navigation
- ⚡ Real-time updates (no reload needed)

---

## 🛠️ Tech Stack

### **Frontend**

- React (Vite or CRA)
- TailwindCSS
- React Router
- Axios
- React Hot Toast
- QRCode.react
- Chart.js + react-chartjs-2
- Framer Motion
- Lucide Icons

### **Backend**

- Django
- Django REST Framework
- Hosted on Render

---

## 🔧 API Endpoints Used

```
POST    /api/shorturls/          → Create short URL
GET     /api/shorturls/          → Get all URLs
DELETE  /api/shorturls/:id/      → Delete a URL
REDIRECT /{short_code}           → Visit shortened URL
```

**Base URL:**

```
https://url-shortener-jgh8.onrender.com
```

---

## 📦 Installation & Setup

### 1. Clone the project

```sh
git clone https://github.com/Genius-mu/url-shortener.git
cd url-short
```

### 2. Install dependencies

```sh
npm install
```

(or)

```sh
yarn install
```

### 3. Start development server

```sh
npm run dev
```

---

## 📁 Project Structure

```
src/
│── components/
│   ├── UrlShortener.jsx
│   ├── UrlCard.jsx
    ├── Dashboard.jsx
│
│── App.jsx
│── main.jsx
│── index.css
```

---

## 🎯 How It Works

### 👉 Shorten a URL

- Paste URL → Click **Shorten** → Instantly get a shortcode
- Auto-added to the list
- Copy button triggers toast
- QR button shows a scannable code with download option

### 👉 Dashboard

Shows:

- Bar chart of click counts
- Total links
- Total clicks
- Most clicked link

---

## 🧑‍💻 Contributors

**Frontend:** Mustapha  
**Backend:** Sumayyah

---

## ⭐ Like This Project?

If you find this useful, leave a ⭐ on the repo!

---

## 📄 License

MIT License – free to modify and use.
