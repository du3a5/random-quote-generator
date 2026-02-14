# 💬 Random Quote Generator

A modern, feature-rich random quote generator built with vanilla JavaScript. Features include real-time quote fetching, dark/light mode, favorite quotes storage, and social sharing capabilities.

<img width="975" height="614" alt="image" src="https://github.com/user-attachments/assets/17c4e404-4ce3-4e12-b46c-6c9e4b7ceb1e" />


## ✨ Features

- 🔄 **Real-time Quote Fetching** - Fetches random quotes from DummyJSON API
- 🌓 **Dark/Light Mode** - Smooth theme switching with persistent user preference
- 📋 **Copy to Clipboard** - One-click quote copying
- 🐦 **Tweet Integration** - Share quotes directly to Twitter
- ❤️ **Save Favorites** - Store and manage your favorite quotes locally
- 🎨 **Dynamic Backgrounds** - Beautiful gradient backgrounds that change with each quote
- 💾 **Local Storage** - Persists favorites and theme preferences
- 📱 **Responsive Design** - Works seamlessly on all devices

## 🚀 Demo

 https://du3a5.github.io/random-quote-generator/

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables and transitions
- **JavaScript (ES6+)** - Async/await, Fetch API, DOM manipulation
- **DummyJSON API** - Quote data source
- **LocalStorage API** - Data persistence

## 📸 Screenshots

### Light Mode

<img width="975" height="614" alt="image" src="https://github.com/user-attachments/assets/8978aef7-27ff-417c-b71d-a5cb521c32fa" />


### Dark Mode

<img width="975" height="585" alt="image" src="https://github.com/user-attachments/assets/33f10f8a-5f0c-4586-8c36-57739d033a4e" />


### Favorites Section

<img width="975" height="639" alt="image" src="https://github.com/user-attachments/assets/d72598f7-c06b-4d53-9f1a-61866808f843" />


## 🎯 Key Learning Outcomes

This project demonstrates proficiency in:

- Asynchronous JavaScript (async/await, Promises)
- RESTful API integration and error handling
- Browser APIs (LocalStorage, Clipboard, Navigator)
- CSS custom properties for theming
- DOM manipulation and event handling
- Responsive web design principles
- User experience and state management


## 💻 Usage

1. Click **"New Quote"** to fetch a random quote
2. Click **"Copy Quote"** to copy the current quote to clipboard
3. Click **"Tweet Quote"** to share on Twitter
4. Click **"❤️ Save Favorite"** to save quotes to your favorites
5. Toggle between light/dark mode using the theme button
6. Manage your saved favorites in the favorites section

## 🏗️ Project Structure

```
random-quote-generator/
├── index.html          # Main HTML file
├── style.css           # Styles and theme variables
├── script.js           # Application logic
├── README.md           # Project documentation
└── screenshots/        # Screenshots for README
    ├── light-mode.png
    ├── dark-mode.png
    └── favorites.png
```

## 🔑 Key Features Explained

### Async/Await for API Calls

```javascript
async function generateQuote() {
  const response = await fetch(API_URL);
  const data = await response.json();
  // Display quote
}
```

### Theme Switching with CSS Variables

```css
:root {
  --bg-card: #ffffff;
}

:root.dark {
  --bg-card: #1e272e;
}
```

### LocalStorage for Persistence

```javascript
localStorage.setItem("theme", "dark");
const savedTheme = localStorage.getItem("theme");
```

## 🌐 API Reference

This project uses the [DummyJSON Quotes API](https://dummyjson.com/docs/quotes)

**Endpoint:** `https://dummyjson.com/quotes/random`

**Response:**

```json
{
  "id": 1,
  "quote": "Life is what happens when you're busy making other plans.",
  "author": "John Lennon"
}
```


## 👨‍💻 Author

Doaa Saad

- GitHub: https://github.com/du3a5
- LinkedIn: https://www.linkedin.com/in/du3a5/
- Email: duaasaad163@gmail.com

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Quotes provided by [DummyJSON](https://dummyjson.com)
- Inspired by modern web design trends
- Built as part of my full-stack development journey

---

⭐ If you found this project helpful, please give it a star!
