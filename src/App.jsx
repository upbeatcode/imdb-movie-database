import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import { useState } from 'react';
import {
  YearPage,
  DecadePage,
  GenrePage,
  RatingPage,
  DateRatedPage
} from './Pages.jsx';
import { HomePage } from './HomePage';
import Analytics from './Analytics.jsx';

function App() {
  const [activeFilter, setActiveFilter] = useState('genres'); // Current filter type (genres, decades, years, etc.)
  const [filterMode, setFilterMode] = useState('normal'); // "normal" or "cumulative"
  const [activeFilters, setActiveFilters] = useState({
    genre: null,
    decade: null,
    year: null,
    rating: null,
    dateRatedYear: null
  });

  // Function to update active filters
  const updateActiveFilters = (filterType, value) => {
    // Make sure numeric values are stored as numbers for consistent comparisons
    let processedValue = value;

    if (filterType === 'year' || filterType === 'dateRatedYear') {
      processedValue = value !== null ? parseInt(value) : null;
    } else if (filterType === 'rating') {
      processedValue = value !== null ? parseFloat(value) : null;
    }

    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: processedValue
    }));
  };

  // Function to clear all filters
  const clearFilters = () => {
    setActiveFilters({
      genre: null,
      decade: null,
      year: null,
      rating: null,
      dateRatedYear: null
    });
  };

  // Function to filter movies based on active filters
  const filterMovies = (movies) => {
    return movies.filter((movie) => {
      // Fix: Proper type comparison and error handling for dates
      const matchesGenre =
        !activeFilters.genre || movie.genres.includes(activeFilters.genre);

      const matchesDecade =
        !activeFilters.decade ||
        `${Math.floor(movie.year / 10) * 10}s` === activeFilters.decade;

      const matchesYear =
        !activeFilters.year || movie.year === activeFilters.year;

      const matchesRating =
        !activeFilters.rating || movie.myRating === activeFilters.rating;

      let matchesDateRatedYear = true;
      if (activeFilters.dateRatedYear !== null) {
        // Use dataRated consistently
        matchesDateRatedYear = false;
        if (movie.dataRated) {
          try {
            const ratedYear = new Date(movie.dataRated).getFullYear();
            matchesDateRatedYear =
              !isNaN(ratedYear) && ratedYear === activeFilters.dateRatedYear;
          } catch (error) {
            console.error(error);
            matchesDateRatedYear = false;
          }
        }
      }

      return (
        matchesGenre &&
        matchesDecade &&
        matchesYear &&
        matchesRating &&
        matchesDateRatedYear
      );
    });
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              filterMode={filterMode}
              setFilterMode={setFilterMode}
              activeFilters={activeFilters}
              updateActiveFilters={updateActiveFilters}
              filterMovies={filterMovies}
              clearFilters={clearFilters}
            />
          }
        />
        {/* Fix: Corrected Route syntax for React Router v6 */}
        <Route path="/genre/:genre" element={<GenrePage />} />
        <Route path="/decade/:decade" element={<DecadePage />} />
        <Route path="/year/:year" element={<YearPage />} />
        <Route path="/rating/:rating" element={<RatingPage />} />
        <Route path="/date-rated/:year" element={<DateRatedPage />} />
        <Route
          path="/analytics"
          element={
            <Analytics
              activeFilters={activeFilters}
              filterMovies={filterMovies}
              updateActiveFilters={updateActiveFilters}
              clearFilters={clearFilters}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
