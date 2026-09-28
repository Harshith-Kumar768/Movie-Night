/* =====================================================
   MOVIE NIGHT - script.js
   1. Movie data (array of objects)
   2. Variables that remember the current state
   3. Selecting HTML elements (DOM)
   4. Search, filter and sort functions
   5. Creating and showing movie cards
   6. Details popup (modal)
   7. Favourites + localStorage
   8. Event listeners
   9. Starting the page
   ===================================================== */


/* ---------- 1. MOVIE DATA ----------
   Each movie is an object. All movies are stored in one array.
   To use your own poster images later, change the poster value,
   for example:  poster: "assets/images/inception.jpg"                */
const movies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    duration: 148,
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    description: "A skilled thief who steals secrets from dreams is offered one last job: plant an idea inside a target's mind.",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"]
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    rating: 9.0,
    duration: 152,
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    description: "Batman faces the Joker, a chaotic criminal mastermind who pushes Gotham City and its heroes to the breaking point.",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.7,
    duration: 169,
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    description: "With Earth dying, a team of explorers travels through a wormhole to find a new home for humanity.",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]
  },
  {
    id: 4,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    rating: 9.3,
    duration: 142,
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    description: "Two imprisoned men form a deep friendship over many years and find hope in small acts of decency.",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman"]
  },
  {
    id: 5,
    title: "Parasite",
    year: 2019,
    genre: "Thriller",
    rating: 8.5,
    duration: 132,
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    description: "A poor family schemes its way into the lives of a wealthy household, with shocking and unpredictable results.",
    director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"]
  },
  {
    id: 6,
    title: "Spirited Away",
    year: 2001,
    genre: "Animation",
    rating: 8.6,
    duration: 125,
    poster: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    description: "A young girl wanders into a world of spirits and must work in a bathhouse to save her parents.",
    director: "Hayao Miyazaki",
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"]
  },
  {
    id: 7,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    genre: "Adventure",
    rating: 8.9,
    duration: 178,
    poster: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    description: "A young hobbit and eight companions set out to destroy a powerful ring and save Middle-earth.",
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"]
  },
  {
    id: 8,
    title: "The Grand Budapest Hotel",
    year: 2014,
    genre: "Comedy",
    rating: 8.1,
    duration: 99,
    poster: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    description: "A legendary hotel concierge and his loyal lobby boy get caught up in a colourful story of theft and friendship.",
    director: "Wes Anderson",
    cast: ["Ralph Fiennes", "Tony Revolori", "F. Murray Abraham"]
  },
  {
    id: 9,
    title: "Whiplash",
    year: 2014,
    genre: "Drama",
    rating: 8.5,
    duration: 106,
    poster: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    description: "A young jazz drummer is pushed to his limits by a ruthless instructor who demands nothing less than perfection.",
    director: "Damien Chazelle",
    cast: ["Miles Teller", "J.K. Simmons"]
  },
  {
    id: 10,
    title: "Toy Story",
    year: 1995,
    genre: "Animation",
    rating: 8.3,
    duration: 81,
    poster: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
    description: "A cowboy doll feels threatened when a shiny new space ranger toy becomes his owner's favourite.",
    director: "John Lasseter",
    cast: ["Tom Hanks", "Tim Allen"]
  }
];


/* ---------- 2. VARIABLES THAT REMEMBER THE CURRENT STATE ---------- */
const FAVOURITES_KEY = "movieNightFavourites";   // name used to save in localStorage

let favourites = [];          // list of favourite movie ids, e.g. [1, 4, 7]
let searchText = "";          // what the user typed in the search box
let selectedGenre = "All";    // genre chosen in the filter
let sortOrder = "default";    // "default", "high" or "low"


/* ---------- 3. SELECTING HTML ELEMENTS (DOM) ---------- */
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const genreButtons = document.querySelectorAll(".genre-btn");
const movieGrid = document.getElementById("movie-grid");
const resultsCount = document.getElementById("results-count");
const noResults = document.getElementById("no-results");
const watchlistGrid = document.getElementById("watchlist-grid");
const watchlistEmpty = document.getElementById("watchlist-empty");
const watchlistCount = document.getElementById("watchlist-count");
const exploreBtn = document.getElementById("explore-btn");
const modal = document.getElementById("movie-modal");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");


/* ---------- 4. SEARCH, FILTER AND SORT ----------
   Each function receives a list of movies and returns a NEW list.
   renderMovies() uses them one after another, so all three work together. */

// Keep only movies whose title contains the text typed by the user
function searchMovies(list) {
  return list.filter((movie) => movie.title.toLowerCase().includes(searchText));
}

// Keep only movies of the selected genre ("All" keeps everything)
function filterMovies(list) {
  if (selectedGenre === "All") {
    return list;
  }
  return list.filter((movie) => movie.genre === selectedGenre);
}

// Sort by rating if the user chose a sort option
function sortMovies(list) {
  const sorted = list.slice();               // make a copy so the original order is safe

  if (sortOrder === "high") {
    sorted.sort((a, b) => b.rating - a.rating);   // highest first
  } else if (sortOrder === "low") {
    sorted.sort((a, b) => a.rating - b.rating);   // lowest first
  }

  return sorted;
}


/* ---------- 5. CREATING AND SHOWING MOVIE CARDS ---------- */

// If a poster image can not load, hide it so the title placeholder is visible
function hideBrokenImage(image) {
  image.addEventListener("error", function () {
    image.style.display = "none";
  });
}

// Build ONE movie card (an <article> element) for the given movie
function createMovieCard(movie) {
  const isFavourite = favourites.includes(movie.id);

  // Decide how the favourite button should look
  let favouriteClass = "";
  let favouriteText = "♡ Favourite";
  let favouriteTip = "Add to watchlist";
  if (isFavourite) {
    favouriteClass = "saved";
    favouriteText = "♥ Favourited";
    favouriteTip = "Remove from watchlist";
  }

  const card = document.createElement("article");
  card.classList.add("movie-card");

  card.innerHTML = `
    <div class="poster-wrapper">
      <span class="poster-fallback">${movie.title}</span>
      <img class="poster-img" src="${movie.poster}" alt="${movie.title} poster">
      <span class="rating-badge"><span class="star">★</span> ${movie.rating.toFixed(1)}</span>
    </div>
    <div class="movie-info">
      <h3 class="movie-title">${movie.title}</h3>
      <div class="movie-meta">
        <span>${movie.year}</span>
        <span class="genre-tag">${movie.genre}</span>
      </div>
      <p class="movie-description">${movie.description}</p>
      <div class="card-buttons">
        <button class="favourite-btn ${favouriteClass}" title="${favouriteTip}">${favouriteText}</button>
        <button class="details-btn">View Details</button>
      </div>
    </div>
  `;

  // Poster fallback
  hideBrokenImage(card.querySelector(".poster-img"));

  // Button clicks
  card.querySelector(".favourite-btn").addEventListener("click", function () {
    toggleFavourite(movie.id);
  });

  card.querySelector(".details-btn").addEventListener("click", function () {
    openMovieModal(movie.id);
  });

  return card;
}

// Show the movies section: search -> filter -> sort -> create cards
function renderMovies() {
  let result = searchMovies(movies);
  result = filterMovies(result);
  result = sortMovies(result);

  movieGrid.innerHTML = "";     // remove the old cards

  if (result.length === 0) {
    noResults.hidden = false;   // show "No movies found"
  } else {
    noResults.hidden = true;
  }

  resultsCount.textContent = "Showing " + result.length + " of " + movies.length + " movies";

  result.forEach(function (movie) {
    movieGrid.appendChild(createMovieCard(movie));
  });
}

// Show the watchlist section (only the favourite movies)
function renderWatchlist() {
  const savedMovies = movies.filter((movie) => favourites.includes(movie.id));

  watchlistGrid.innerHTML = "";

  if (savedMovies.length === 0) {
    watchlistEmpty.hidden = false;   // show "No movies added to your watchlist yet."
  } else {
    watchlistEmpty.hidden = true;
  }

  savedMovies.forEach(function (movie) {
    watchlistGrid.appendChild(createMovieCard(movie));
  });

  watchlistCount.textContent = savedMovies.length;   // number in the navbar
}


/* ---------- 6. DETAILS POPUP (MODAL) ---------- */

function openMovieModal(movieId) {
  // find() returns the first movie whose id matches
  const movie = movies.find((m) => m.id === movieId);

  modalBody.innerHTML = `
    <div class="poster-wrapper modal-poster">
      <span class="poster-fallback">${movie.title}</span>
      <img class="poster-img" src="${movie.poster}" alt="${movie.title} poster">
    </div>
    <div class="modal-info">
      <h2 id="modal-title">${movie.title}</h2>
      <div class="modal-meta">
        <span class="modal-rating"><span class="star">★</span> ${movie.rating.toFixed(1)}</span>
        <span>${movie.year}</span>
        <span>${movie.duration} min</span>
        <span class="genre-tag">${movie.genre}</span>
      </div>
      <p class="modal-description">${movie.description}</p>
      <p class="modal-detail"><strong>Director:</strong> ${movie.director}</p>
      <p class="modal-detail"><strong>Cast:</strong> ${movie.cast.join(", ")}</p>
    </div>
  `;

  hideBrokenImage(modalBody.querySelector(".poster-img"));

  modal.classList.add("open");                 // CSS shows the popup
  document.body.classList.add("modal-open");   // stops the page scrolling behind it
}

function closeMovieModal() {
  modal.classList.remove("open");
  document.body.classList.remove("modal-open");
}


/* ---------- 7. FAVOURITES + LOCALSTORAGE ----------
   localStorage saves text in the browser, so favourites stay after refresh.
   Arrays must be turned into text first: JSON.stringify() to save,
   JSON.parse() to turn the text back into an array.
   try/catch is a safety net in case the browser blocks storage.      */

function saveFavourites() {
  try {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
  } catch (error) {
    console.log("Could not save favourites:", error);
  }
}

function loadFavourites() {
  try {
    const saved = localStorage.getItem(FAVOURITES_KEY);
    if (saved !== null) {
      favourites = JSON.parse(saved);
    }
  } catch (error) {
    favourites = [];
  }
}

// Add the movie if it is not a favourite yet, otherwise remove it
function toggleFavourite(movieId) {
  if (favourites.includes(movieId)) {
    favourites = favourites.filter((id) => id !== movieId);   // remove
  } else {
    favourites.push(movieId);                                 // add (never twice)
  }

  saveFavourites();
  renderMovies();
  renderWatchlist();
}


/* ---------- 8. EVENT LISTENERS ---------- */

// Search while typing
searchInput.addEventListener("input", function () {
  searchText = searchInput.value.toLowerCase().trim();
  renderMovies();
});

// Sort dropdown
sortSelect.addEventListener("change", function () {
  sortOrder = sortSelect.value;
  renderMovies();
});

// Genre buttons: add a click listener to each one
genreButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedGenre = button.dataset.genre;        // reads data-genre="..." from the HTML

    genreButtons.forEach(function (otherButton) {
      otherButton.classList.remove("active");
    });
    button.classList.add("active");

    renderMovies();
  });
});

// Hero button scrolls down to the movies section
exploreBtn.addEventListener("click", function () {
  document.getElementById("movies").scrollIntoView({ behavior: "smooth" });
});

// Close the popup: X button, click outside the box, or Escape key
modalClose.addEventListener("click", closeMovieModal);

modal.addEventListener("click", function (event) {
  if (event.target === modal) {      // only when the dark background itself is clicked
    closeMovieModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeMovieModal();
  }
});


/* ---------- 9. STARTING THE PAGE ---------- */
loadFavourites();     // 1. get saved favourites from localStorage
renderMovies();       // 2. show all movies
renderWatchlist();    // 3. show the watchlist
