// API URL - we'll use the Quotable API
const API_URL = "https://dummyjson.com/quotes/random";

// Array of beautiful gradient backgrounds
const backgrounds = [
  "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
  "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
  "linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)",
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  "linear-gradient(135deg, #ffd89b 0%, #19547b 100%)",
  "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
];

// Get elements from the DOM
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const loadingElement = document.getElementById("loading");
const copyButton = document.getElementById("copy-quote");
const tweetButton = document.getElementById("tweet-quote");
const favoriteButton = document.getElementById("favorite-quote");
const favoritesList = document.getElementById("favorites-list");
const themeToggle = document.getElementById("theme-toggle");

//Function to show loading state
function showLoading() {
  loadingElement.classList.add("show");
  quoteElement.classList.add("hide");
  authorElement.classList.add("hide");
}

//Function to remove loading state
function hideLoading() {
  loadingElement.classList.remove("show");
  quoteElement.classList.remove("hide");
  authorElement.classList.remove("hide");
}

// Function to change background randomly
function changeBackground() {
  // Get a random index from backgrounds array
  const randomIndex = Math.floor(Math.random() * backgrounds.length);

  // Get the gradient at that index
  const randomGradient = backgrounds[randomIndex];

  // Apply it to the body
  document.body.style.background = randomGradient;
}

//#1) Function to fetch and display a quote from the API
async function generateQuote() {
  //Show loading state
  showLoading();

  try {
    // Fetch data from the API
    const response = await fetch(API_URL);

    // Convert response to JSON
    const data = await response.json();

    //console.log("API Data:", data);

    // Update the HTML with the new quote and author
    quoteElement.textContent = `"${data.quote}"`;
    authorElement.textContent = `- ${data.author}`;

    // Change background with each new quote
    changeBackground();

    // Hide loading indicator
    hideLoading();
  } catch (error) {
    // If there's an error, show a message
    console.error("Error fetching quote:", error);
    quoteElement.textContent =
      "Oops! Couldn't fetch a quote. Please try again.";
    authorElement.textContent = "";
    hideLoading();
  }
}
// Add event listener to the button
newQuoteButton.addEventListener("click", generateQuote);

// Display a quote when page loads
generateQuote();

//#2) Function to copy quote to clipboard
function copyQuote() {
  // Get the current quote and author text
  const quoteText = quoteElement.textContent;
  const authorText = authorElement.textContent;
  const fullText = `${quoteText} ${authorText}`;

  // Copy to clipboard
  navigator.clipboard
    .writeText(fullText)
    .then(() => {
      // Change button text temporarily to show it worked
      const originalText = copyButton.textContent;
      copyButton.textContent = "Copied!";

      // Change back after 2 seconds (Reset after 2 sec)
      setTimeout(() => {
        copyButton.textContent = originalText;
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
      alert("Failed to copy quote");
    });
}
copyButton.addEventListener("click", copyQuote);

//#3) Function to tweet the quote
function tweetQuote() {
  // Get the current quote and author
  const quoteText = quoteElement.textContent;
  const authorText = authorElement.textContent;

  // Create the tweet text
  const tweetText = `${quoteText} ${authorText}`;

  // Twitter URL with pre-filled text
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  // Open Twitter in a new window
  window.open(twitterUrl, "_blank");
}

// Add event listener to tweet button
tweetButton.addEventListener("click", tweetQuote);

//#4) Save favorite quotes
// Array to store favorites (will be loaded from localStorage)
let favorites = [];

// Function to load favorites from localStorage
function loadFavorites() {
  // Get favorites from localStorage
  const savedFavorites = localStorage.getItem("favoriteQuotes");

  // If there are saved favorites, parse them
  if (savedFavorites) {
    favorites = JSON.parse(savedFavorites);
  }

  // Display them
  displayFavorites();
}

// Function to save favorites to localStorage
function saveFavorites() {
  localStorage.setItem("favoriteQuotes", JSON.stringify(favorites));
}

// Function to add current quote to favorites
function addToFavorites() {
  // Get current quote and author
  const currentQuote = quoteElement.textContent.replace(/"/g, ""); // Remove quotes
  const currentAuthor = authorElement.textContent.replace("- ", ""); // Remove dash

  // Create favorite object
  const favorite = {
    quote: currentQuote,
    author: currentAuthor,
    id: Date.now(), // Unique ID based on timestamp
  };

  // Check if quote is already in favorites
  const alreadyExists = favorites.some((fav) => fav.quote === currentQuote);

  if (alreadyExists) {
    alert("This quote is already in your favorites!");
    return;
  }

  // Add to favorites array
  favorites.push(favorite);

  // Save to localStorage
  saveFavorites();

  // Update display
  displayFavorites();

  // Show feedback
  favoriteButton.textContent = "✓ Saved!";
  favoriteButton.classList.add("saved");

  setTimeout(() => {
    favoriteButton.textContent = "❤️ Save Favorite";
    favoriteButton.classList.remove("saved");
  }, 2000);
}

// Function to remove a favorite
function removeFavorite(id) {
  // Filter out the favorite with this ID
  favorites = favorites.filter((fav) => fav.id !== id);

  // Save updated list
  saveFavorites();

  // Update display
  displayFavorites();
}

// Function to display favorites
function displayFavorites() {
  // Clear current display
  favoritesList.innerHTML = "";

  // If no favorites, show message
  if (favorites.length === 0) {
    favoritesList.innerHTML =
      '<p class="no-favorites">No favorite quotes yet. Click the heart button to save quotes!</p>';
    return;
  }

  // Display each favorite
  favorites.forEach((favorite) => {
    const favoriteDiv = document.createElement("div");
    favoriteDiv.className = "favorite-item";
    favoriteDiv.innerHTML = `
            <p>"${favorite.quote}"</p>
            <p class="author">- ${favorite.author}</p>
            <button class="remove-btn" onclick="removeFavorite(${favorite.id})">Remove</button>
        `;
    favoritesList.appendChild(favoriteDiv);
  });
}

// Add event listener to favorite button
favoriteButton.addEventListener("click", addToFavorites);

// Load favorites when page loads
loadFavorites();

// Function to set theme
function setTheme(theme) {
  if (theme === "dark") {
    // Add dark class to root element
    document.documentElement.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
  } else {
    // Remove dark class from root element
    document.documentElement.classList.remove("dark");
    themeToggle.textContent = "🌙 Dark Mode";
  }

  // Save preference to localStorage
  localStorage.setItem("theme", theme);
}

// Function to toggle theme
function toggleTheme() {
  // Check if dark mode is currently active
  const isDark = document.documentElement.classList.contains("dark");

  // Switch to opposite theme
  if (isDark) {
    setTheme("light");
  } else {
    setTheme("dark");
  }
}

// Function to load saved theme
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    setTheme(savedTheme);
  }
}

// Add event listener to theme toggle button
themeToggle.addEventListener("click", toggleTheme);

// Load saved theme when page loads
loadTheme();
