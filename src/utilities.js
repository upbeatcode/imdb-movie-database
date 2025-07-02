export const formatRuntime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h${mins > 0 ? ` ${mins}min` : ''}`;
};

export const formatNumber = (num) => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + 'm';
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'k';
  }
  return num;
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const generateFilterHeader = (activeFilters, movieCount) => {
  const { genre, decade, year, rating, dateRatedYear } = activeFilters;
  
  // Start building filter description parts
  const filterParts = [];
  
  // Add rating part if present
  if (rating !== null) {
    filterParts.push(`rated ${rating}★`);
  }
  
  // Add genre part if present
  if (genre !== null) {
    filterParts.push(`in "${genre}"`);
  }
  
  // Add decade part if present
  if (decade !== null) {
    filterParts.push(`from the ${decade}`);
  }
  
  // Add specific year part if present
  if (year !== null) {
    filterParts.push(`from ${year}`);
  }
  
  // Add date rated year part if present
  if (dateRatedYear !== null) {
    filterParts.push(`watched in ${dateRatedYear}`);
  }
  
  // Combine all parts into a complete description
  if (filterParts.length === 0) {
    return `All Movies (${movieCount})`;
  }
  
  // Join with proper separators for readability
  let description = "";
  
  if (filterParts.length === 1) {
    description = `Movies ${filterParts[0]}`;
  } else if (filterParts.length === 2) {
    description = `Movies ${filterParts[0]} and ${filterParts[1]}`;
  } else {
    // For 3+ filters, use semicolons for better visual separation
    const lastPart = filterParts.pop();
    description = `Movies ${filterParts.join("; ")}; and ${lastPart}`;
  }
  
  return `${description} (${movieCount})`;
};

// Function to get unique genres from the movie data
export const getUniqueGenres = (movies) => {
  const genres = new Set();
  movies.forEach((movie) => movie.genres.forEach((genre) => genres.add(genre)));
  return Array.from(genres);
};

// Function to get unique decades from the movie data
export const getUniqueDecades = (movies) => {
  const decades = new Set();
  movies.forEach((movie) => {
    const decade = Math.floor(movie.year / 10) * 10; // Calculate the decade (e.g., 1987 -> 1980s)
    decades.add(`${decade}s`); // Add the decade to the set (e.g., "1980s")
  });
  return Array.from(decades).sort(); // Sort the decades in ascending order
};

// Function to get unique years from the movie data
export const getUniqueYears = (movies) => {
  const years = new Set();
  movies.forEach((movie) => years.add(movie.year)); // Add the year to the set
  return Array.from(years).sort((a, b) => b - a); // Sort years in descending order (newest first)
};

// Function to get unique "My Rating" values from the movie data
export const getUniqueRatings = (movies) => {
  const ratings = new Set();
  movies.forEach((movie) => ratings.add(movie.myRating)); // Add the rating to the set
  return Array.from(ratings).sort((a, b) => b - a); // Sort ratings in descending order (highest first)
};

// Function to get unique years from the "Date Rated" field
export const getUniqueDateRatedYears = (movies) => {
  const years = new Set();
  movies.forEach((movie) => {
    // Use dateRated consistently (matches the data source)
    if (movie.dateRated) {
      try {
        const year = new Date(movie.dateRated).getFullYear(); // Extract the year from the date
        if (!isNaN(year)) { // Check if the year is a valid number
          years.add(year);
        }
      } catch (error) {
        console.error("Invalid date format:", movie.dateRated);
        console.error(error);
      }
    }
  });
  return Array.from(years).sort((a, b) => b - a); // Sort years in descending order (newest first)
};