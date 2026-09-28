# Movie Night 🎬

**Movie Night** is a responsive, client-side movie discovery web application built with pure HTML, CSS, and Vanilla JavaScript[cite: 2, 3, 4]. It allows users to browse through popular films, perform real-time searches, filter by genre, sort by rating, view detailed movie information in a modal, and save their favorite titles to a persistent watchlist[cite: 2, 3].

---

## 🚀 Features

* **Real-time Title Search**: Dynamically filter movies as you type in the search bar[cite: 2, 3].
* **Genre Filtering**: Filter films instantly by genres including Action, Sci-Fi, Drama, Thriller, Animation, Comedy, and Adventure[cite: 2, 3].
* **Rating Sorting**: Sort movies by rating in ascending or descending order[cite: 2, 3].
* **Interactive Watchlist**: Add or remove movies to/from your personal watchlist with persistence using browser `localStorage`[cite: 2, 3].
* **Detailed Movie Modal**: View additional details for each movie—including duration, director, cast, and high-resolution posters—inside an accessible modal popup[cite: 2, 3].
* **Dark Cinematic UI**: Designed with a sleek, dark-themed responsive layout using modern CSS Grid and Flexbox[cite: 4].
* **Poster Fallbacks**: Graceful image handling that displays title placecard fallbacks if a remote poster fails to load[cite: 3, 4].

---

## 🛠️ Tech Stack

* **HTML5**: Semantic layout and elements[cite: 2].
* **CSS3**: Custom CSS variables, CSS Grid, Flexbox, smooth transitions, and keyframe animations[cite: 4].
* **JavaScript (ES6+)**: Vanilla JS DOM manipulation, array techniques (`filter`, `map`, `sort`), event delegation, and `localStorage` API.
* **Google Fonts**: *Oswald* (Headings) and *Inter* (Body)[cite: 2].

---

## 📁 Project Structure

```text
Movie-Night/
│
├── index.html     # Main HTML structure and section layouts
├── style.css      # Custom styling, dark theme, grid/flex layouts, and animations
├── script.js     # Movie data array, filtering logic, state management, and event listeners
└── README.md      # Project documentation
🚦 Getting StartedNo external frameworks or build tools (e.g., Node.js, Webpack) are required.1. Clone the repositoryBashgit clone [https://github.com/Harshith-Kumar768/Movie-Night.git](https://github.com/Harshith-Kumar768/Movie-Night.git)
2. Run the applicationOpen the index.html file directly in any web browser, or launch it using an extension like Live Server in Visual Studio Code.📝 How It WorksMovie Data: All film entries are maintained in script.js as an array of objects.   Filtering Pipeline: The application chains search, genre filtering, and sorting functions together before rendering the final list of cards to the DOM.   Local Storage: Saved watchlist item IDs are serialized as JSON strings in localStorage (movieNightFavourites) so your list persists across browser reloads[cite: 3].
