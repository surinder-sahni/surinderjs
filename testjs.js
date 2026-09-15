const url = "https://imdb-top-100-movies.p.rapidapi.com/";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "810e177ab8mshc9580d70114440cp183a3ejsnb3b928ef495e",
    "x-rapidapi-host": "imdb-top-100-movies.p.rapidapi.com",
  },
};

const cardsContainer = document.querySelector(".cards-container");

async function fetchMovies() {
  // Check if container exists
  if (!cardsContainer) {
    console.error("Error: .cards-container was not found.");
    return;
  }

  // Show loading message
  cardsContainer.innerHTML = `
    <p class="loading">Loading movies...</p>
  `;

  try {
    console.log("Fetching movies...");

    const response = await fetch(url, options);

    // Check HTTP status
    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    // Convert response to JSON
    const movies = await response.json();

    console.log("API Response:", movies);

    // Make sure we received an array
    if (!Array.isArray(movies)) {
      throw new Error("Invalid API response. Expected an array of movies.");
    }

    // Check if array is empty
    if (movies.length === 0) {
      cardsContainer.innerHTML = `
        <p class="error">No movies were found.</p>
      `;

      return;
    }

    console.log(`Total Movies: ${movies.length}`);

    // Create movie cards
    const moviesHTML = movies.map((movie) => {
      return `
        <div class="movie-card">
          <h2 class="m-title">${movie.title || "Untitled Movie"}</h2>

          <p class="m-description">
            ${movie.description || "No description available."}
          </p>

          <p class="m-year">
            Year: ${movie.year || "N/A"}
          </p>

          <p class="m-rating">
            Rating: ${movie.rating || "N/A"}
          </p>
        </div>
      `;
    });

    // Add cards to page
    cardsContainer.innerHTML = moviesHTML.join("");

    console.log("Movies successfully displayed.");

  } catch (error) {
    console.error("Failed to fetch movies:", error);

    // Show error to user
    cardsContainer.innerHTML = `
      <div class="api-error">
        <h2>Something went wrong</h2>
        <p>
          We couldn't load the movies right now.
        </p>
        <p>
          Error: ${error.message}
        </p>
      </div>
    `;
  }
}

// Run function
fetchMovies();