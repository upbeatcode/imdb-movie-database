import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { data } from "./assets/data.js";
import MovieTable from "./MovieTable";

// Define GenreTabs component
function GenreTabs({ currentGenre, onSelect }) {
  const genres = new Set();
  data.forEach((movie) => movie.genres.forEach((genre) => genres.add(genre)));
  const uniqueGenres = Array.from(genres);

  return (
    <div className="tabs">
      <button
        className={!currentGenre ? "active" : ""}
        onClick={() => onSelect(null)}
      >
        All Genres
      </button>
      {uniqueGenres.map((genre) => (
        <button
          key={genre}
          className={currentGenre === genre ? "active" : ""}
          onClick={() => onSelect(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

// Define DecadeTabs component
function DecadeTabs({ currentDecade, onSelect }) {
  const decades = new Set();
  data.forEach((movie) => {
    const decade = Math.floor(movie.year / 10) * 10;
    decades.add(`${decade}s`);
  });
  const uniqueDecades = Array.from(decades).sort();

  return (
    <div className="tabs">
      <button
        className={!currentDecade ? "active" : ""}
        onClick={() => onSelect(null)}
      >
        All Decades
      </button>
      {uniqueDecades.map((decade) => (
        <button
          key={decade}
          className={currentDecade === decade ? "active" : ""}
          onClick={() => onSelect(decade)}
        >
          {decade}
        </button>
      ))}
    </div>
  );
}

// Define YearTabs component
function YearTabs({ currentYear, onSelect }) {
  const years = new Set();
  data.forEach((movie) => years.add(movie.year));
  const uniqueYears = Array.from(years).sort((a, b) => b - a);

  return (
    <div className="tabs">
      <button
        className={!currentYear ? "active" : ""}
        onClick={() => onSelect(null)}
      >
        All Years
      </button>
      {uniqueYears.map((year) => (
        <button
          key={year}
          className={currentYear === year.toString() ? "active" : ""}
          onClick={() => onSelect(year)}
        >
          {year}
        </button>
      ))}
    </div>
  );
}

// Define RatingTabs component
function RatingTabs({ currentRating, onSelect }) {
  const ratings = new Set();
  data.forEach((movie) => ratings.add(movie.myRating));
  const uniqueRatings = Array.from(ratings).sort((a, b) => b - a);

  return (
    <div className="tabs">
      <button
        className={!currentRating ? "active" : ""}
        onClick={() => onSelect(null)}
      >
        All Ratings
      </button>
      {uniqueRatings.map((rating) => (
        <button
          key={rating}
          className={currentRating === rating.toString() ? "active" : ""}
          onClick={() => onSelect(rating)}
        >
          {rating}
        </button>
      ))}
    </div>
  );
}

// Define DateRatedTabs component
function DateRatedTabs({ currentDateRatedYear, onSelect }) {
  const years = new Set();
  data.forEach((movie) => {
    if (movie.dateRated) {
      const year = new Date(movie.dateRated).getFullYear();
      years.add(year);
    }
  });
  const uniqueYears = Array.from(years).sort((a, b) => b - a);

  return (
    <div className="tabs">
      <button
        className={!currentDateRatedYear ? "active" : ""}
        onClick={() => onSelect(null)}
      >
        All Years
      </button>
      {uniqueYears.map((year) => (
        <button
          key={year}
          className={currentDateRatedYear === year.toString() ? "active" : ""}
          onClick={() => onSelect(year)}
        >
          {year}
        </button>
      ))}
    </div>
  );
}

function Layout({
  children,
  activeFilter,
  setActiveFilter,
  filterMode,
  setFilterMode,
  activeFilters,
  updateActiveFilters,
  filterMovies,
  clearFilters,
}) {
  const navigate = useNavigate();

  // Handle filter selection
  const handleFilterSelect = (filterType, value) => {
    if (filterMode === "cumulative") {
      updateActiveFilters(filterType, value);
    } else {
      // Normal filter mode: navigate to the selected filter
      let path;
      switch (filterType) {
        case "genre":
          path = `/genre/${value}`;
          break;
        case "decade":
          path = `/decade/${value}`;
          break;
        case "year":
          path = `/year/${value}`;
          break;
        case "rating":
          path = `/rating/${value}`;
          break;
        case "dateRatedYear":
          path = `/date-rated/${value}`;
          break;
        default:
          path = "/";
      }
      navigate(path);
    }
  };

  // Get filtered movies
  const filteredMovies = filterMode === "cumulative" ? filterMovies(data) : data;

  return (
    <div>
      {/* Filter Mode Buttons */}
      <div className="filter-mode-buttons">
        <button
          className={`filter-toggle ${filterMode === "normal" ? "active" : ""}`}
          onClick={() => setFilterMode("normal")}
        >
          Normal Filter
        </button>
        <button
          className={`filter-toggle ${filterMode === "cumulative" ? "active" : ""}`}
          onClick={() => setFilterMode("cumulative")}
        >
          Cumulative Filter
        </button>
        {filterMode === "cumulative" && (
          <button onClick={clearFilters} className="clear-filters">
            Clear Filters
          </button>
        )}
      </div>

      {/* Filter Toggles */}
      <div className="filter-tabs">
        <button
          className={`filter-toggle ${activeFilter === "genres" ? "active" : ""}`}
          onClick={() => setActiveFilter("genres")}
        >
          Filter by Genre
        </button>
        <button
          className={`filter-toggle ${activeFilter === "decades" ? "active" : ""}`}
          onClick={() => setActiveFilter("decades")}
        >
          Filter by Decade
        </button>
        <button
          className={`filter-toggle ${activeFilter === "years" ? "active" : ""}`}
          onClick={() => setActiveFilter("years")}
        >
          Filter by Year
        </button>
        <button
          className={`filter-toggle ${activeFilter === "ratings" ? "active" : ""}`}
          onClick={() => setActiveFilter("ratings")}
        >
          Filter by Rating
        </button>
        <button
          className={`filter-toggle ${activeFilter === "dateRated" ? "active" : ""}`}
          onClick={() => setActiveFilter("dateRated")}
        >
          Filter by Date Rated
        </button>
      </div>

      {/* Filter Tabs */}
      {activeFilter === "genres" && (
        <GenreTabs
          currentGenre={activeFilters.genre}
          onSelect={(genre) => handleFilterSelect("genre", genre)}
        />
      )}
      {activeFilter === "decades" && (
        <DecadeTabs
          currentDecade={activeFilters.decade}
          onSelect={(decade) => handleFilterSelect("decade", decade)}
        />
      )}
      {activeFilter === "years" && (
        <YearTabs
          currentYear={activeFilters.year}
          onSelect={(year) => handleFilterSelect("year", year)}
        />
      )}
      {activeFilter === "ratings" && (
        <RatingTabs
          currentRating={activeFilters.rating}
          onSelect={(rating) => handleFilterSelect("rating", rating)}
        />
      )}
      {activeFilter === "dateRated" && (
        <DateRatedTabs
          currentDateRatedYear={activeFilters.dateRatedYear}
          onSelect={(year) => handleFilterSelect("dateRatedYear", year)}
        />
      )}

      {/* Render the children (page content) */}
      {children}
    </div>
  );
}

// PropTypes for all components

GenreTabs.propTypes = {
  currentGenre: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

DecadeTabs.propTypes = {
  currentDecade: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

YearTabs.propTypes = {
  currentYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onSelect: PropTypes.func.isRequired
};

RatingTabs.propTypes = {
  currentRating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onSelect: PropTypes.func.isRequired
};

DateRatedTabs.propTypes = {
  currentDateRatedYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onSelect: PropTypes.func.isRequired
};

Layout.propTypes = {
  children: PropTypes.node,
  activeFilter: PropTypes.string.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
  filterMode: PropTypes.string.isRequired,
  setFilterMode: PropTypes.func.isRequired,
  activeFilters: PropTypes.shape({
    genre: PropTypes.string,
    decade: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dateRatedYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired,
  updateActiveFilters: PropTypes.func.isRequired,
  filterMovies: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired
};

export default Layout;