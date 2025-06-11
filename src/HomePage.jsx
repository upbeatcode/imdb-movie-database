import { HomePageProps } from './componentProps.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { data } from './assets/data.js';
import MovieTable from './MovieTable.jsx';
import DataVisualization from './DataVisualization.jsx';
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
  const [showVisualization, setShowVisualization] = useState(false);

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

      {/* Visualization Toggle Button */}
      <div className="visualization-toggle">
        <button
          className={`filter-toggle ${showVisualization ? 'active' : ''}`}
          onClick={() => setShowVisualization(!showVisualization)}
        >
          {showVisualization ? 'Hide Visualization' : 'Show Visualization'}
        </button>
      </div>

      {/* Data Visualization Section */}
      {showVisualization && <DataVisualization data={filteredMovies} />}

      {/* Filter Toggles */}
      <div className="filter-tabs">
        <button
          className={`filter-toggle ${
            activeFilter === 'genres' ? 'active' : ''
          }`}
          onClick={() => setActiveFilter('genres')}
        >
          Filter by Genre
        </button>
        <button
          className={`filter-toggle ${
            activeFilter === 'decades' ? 'active' : ''
          }`}
          onClick={() => setActiveFilter('decades')}
        >
          Filter by Decade
        </button>
        <button
          className={`filter-toggle ${
            activeFilter === 'years' ? 'active' : ''
          }`}
          onClick={() => setActiveFilter('years')}
        >
          Filter by Year
        </button>
        <button
          className={`filter-toggle ${
            activeFilter === 'ratings' ? 'active' : ''
          }`}
          onClick={() => setActiveFilter('ratings')}
        >
          Filter by Rating
        </button>
        <button
          className={`filter-toggle ${
            activeFilter === 'dateRated' ? 'active' : ''
          }`}
          onClick={() => setActiveFilter('dateRated')}
        >
          Filter by Date Rated
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
