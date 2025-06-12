import { HomePageProps } from './componentProps.js';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
import { data } from './assets/data.js';
import MovieTable from './MovieTable.jsx';
// import DataVisualization from './DataVisualization.jsx';
import { generateFilterHeader } from './utilities.js';
import {
  GenreTabs,
  DecadeTabs,
  YearTabs,
  RatingTabs,
  DateRatedTabs
} from './Tabs.jsx';

export function HomePage({
  activeFilter,
  setActiveFilter,
  filterMode,
  setFilterMode,
  activeFilters,
  updateActiveFilters,
  filterMovies,
  clearFilters
}) {
  const navigate = useNavigate();

  // Handle filter selection
  const handleFilterSelect = (filterType, value) => {
    if (filterMode === 'cumulative') {
      updateActiveFilters(filterType, value);
    } else {
      // Normal filter mode: navigate to the selected filter
      let path;
      switch (filterType) {
        case 'genre':
          path = value ? `/genre/${value}` : '/';
          break;
        case 'decade':
          path = value ? `/decade/${value}` : '/';
          break;
        case 'year':
          path = value ? `/year/${value}` : '/';
          break;
        case 'rating':
          path = value ? `/rating/${value}` : '/';
          break;
        case 'dateRatedYear':
          path = value ? `/date-rated/${value}` : '/';
          break;
        default:
          path = '/';
      }
      navigate(path);
    }
  };

  // Get filtered movies
  const filteredMovies =
    filterMode === 'cumulative' ? filterMovies(data) : data;

  return (
    <div>
      {/* Filter Mode Buttons */}
      <div className="filter-mode-buttons">
        <button
          className={`filter-toggle ${filterMode === 'normal' ? 'active' : ''}`}
          onClick={() => setFilterMode('normal')}
        >
          Normal Filter
        </button>
        <button
          className={`filter-toggle ${
            filterMode === 'cumulative' ? 'active' : ''
          }`}
          onClick={() => setFilterMode('cumulative')}
        >
          Cumulative Filter
        </button>
        {filterMode === 'cumulative' && (
          <button onClick={clearFilters} className="clear-filters">
            Clear Filters
          </button>
        )}
      </div>

      {/* Filter Toggles */}
      <div className="filter-tabs">
        <button
          className={`filter-toggle ${
            activeFilter === 'genres' ? 'active' : ''
          }`}
          onClick={() => setActiveFilter('genres')}
        >
          <span className="filter-text-full">Filter by Genre</span>
          <span className="filter-text-short">Genre</span>
        </button>
        <button
          className={`filter-toggle ${
            activeFilter === 'decades' ? 'active' : ''
          }`}
          onClick={() => setActiveFilter('decades')}
        >
          <span className="filter-text-full">Filter by Decade</span>
          <span className="filter-text-short">Decade</span>
        </button>
        <button
          className={`filter-toggle ${
            activeFilter === 'years' ? 'active' : ''
          }`}
          onClick={() => setActiveFilter('years')}
        >
          <span className="filter-text-full">Filter by Year</span>
          <span className="filter-text-short">Year</span>
        </button>
        <button
          className={`filter-toggle ${
            activeFilter === 'ratings' ? 'active' : ''
          }`}
          onClick={() => setActiveFilter('ratings')}
        >
          <span className="filter-text-full">Filter by Rating</span>
          <span className="filter-text-short">Rating</span>
        </button>
        <button
          className={`filter-toggle ${
            activeFilter === 'dateRated' ? 'active' : ''
          }`}
          onClick={() => setActiveFilter('dateRated')}
        >
          <span className="filter-text-full">Filter by Date Rated</span>
          <span className="filter-text-short">Date</span>
        </button>
      </div>

      {/* Filter Tabs */}
      {activeFilter === 'genres' && (
        <GenreTabs
          currentGenre={activeFilters.genre}
          onSelect={(genre) => handleFilterSelect('genre', genre)}
        />
      )}
      {activeFilter === 'decades' && (
        <DecadeTabs
          currentDecade={activeFilters.decade}
          onSelect={(decade) => handleFilterSelect('decade', decade)}
        />
      )}
      {activeFilter === 'years' && (
        <YearTabs
          currentYear={activeFilters.year}
          onSelect={(year) => handleFilterSelect('year', year)}
        />
      )}
      {activeFilter === 'ratings' && (
        <RatingTabs
          currentRating={activeFilters.rating}
          onSelect={(rating) => handleFilterSelect('rating', rating)}
        />
      )}
      {activeFilter === 'dateRated' && (
        <DateRatedTabs
          currentDateRatedYear={activeFilters.dateRatedYear}
          onSelect={(year) => handleFilterSelect('dateRatedYear', year)}
        />
      )}

      {/* Display Filtered Movies with Dynamic Header */}
      <div className="filter-results">
        <h2 className="filter-header">
          {generateFilterHeader(activeFilters, filteredMovies.length)}
        </h2>
      </div>
      <MovieTable data={filteredMovies} />
    </div>
  );
}

HomePage.propTypes = HomePageProps;
