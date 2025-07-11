import { useState } from 'react';
import { data } from './assets/data.js';
import DataVisualization from './DataVisualization.jsx';
import { generateFilterHeader } from './utilities.js';
import {
  GenreTabs,
  DecadeTabs,
  YearTabs,
  RatingTabs,
  DateRatedTabs
} from './Tabs.jsx';
import { AnalyticsProps } from './componentProps.js';
import YourVsImdbRatingsScatterPlot from './components/YourVsImdbRatingsScatterPlot.jsx';
import MoviesRatedOverTime from './components/MoviesRatedOverTime.jsx';
import AverageRatingPerGenre from './components/AverageRatingPerGenre.jsx';
import RatingDistributionHistogram from './components/RatingDistributionHistogram.jsx';


const Analytics = ({
  activeFilters,
  filterMovies,
  updateActiveFilters,
  clearFilters
}) => {
  const [activeFilter, setActiveFilter] = useState('genres');

  // Handle filter selection (always cumulative in analytics)
  const handleFilterSelect = (filterType, value) => {
    updateActiveFilters(filterType, value);
  };

  // Get filtered movies
  const filteredMovies = filterMovies(data);

  return (
    <div className="analytics-page">
      {/* Analytics Header */}
      <div className="analytics-header">
        <h1>Movie Analytics Dashboard</h1>
        <p>Analyze your movie viewing patterns and preferences</p>
      </div>

      {/* Filter Controls */}
      <div className="analytics-filters">
        <h3>Filter Your Data</h3>
        
        {/* Clear Filters Button */}
        <div className="filter-mode-buttons">
          <button onClick={clearFilters} className="clear-filters">
            Clear All Filters
          </button>
        </div>

        {/* Filter Toggles */}
        <div className="filter-tabs">
          <button
            className={`filter-toggle ${activeFilter === 'genres' ? 'active' : ''}`}
            onClick={() => setActiveFilter('genres')}
          >
            <span className="filter-text-full">Filter by Genre</span>
            <span className="filter-text-short">Genre</span>
          </button>
          <button
            className={`filter-toggle ${activeFilter === 'decades' ? 'active' : ''}`}
            onClick={() => setActiveFilter('decades')}
          >
            <span className="filter-text-full">Filter by Decade</span>
            <span className="filter-text-short">Decade</span>
          </button>
          <button
            className={`filter-toggle ${activeFilter === 'years' ? 'active' : ''}`}
            onClick={() => setActiveFilter('years')}
          >
            <span className="filter-text-full">Filter by Year</span>
            <span className="filter-text-short">Year</span>
          </button>
          <button
            className={`filter-toggle ${activeFilter === 'ratings' ? 'active' : ''}`}
            onClick={() => setActiveFilter('ratings')}
          >
            <span className="filter-text-full">Filter by Rating</span>
            <span className="filter-text-short">Rating</span>
          </button>
          <button
            className={`filter-toggle ${activeFilter === 'dateRated' ? 'active' : ''}`}
            onClick={() => setActiveFilter('dateRated')}
          >
            <span className="filter-text-full">Filter by Date Rated</span>
            <span className="filter-text-short">Date</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs-content">
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
        </div>
      </div>

      {/* Current Filter Status */}
      <div className="filter-status">
        <h3>{generateFilterHeader(activeFilters, filteredMovies.length)}</h3>
      </div>

      {/* Analytics Content */}
      <div className="analytics-content">
        {/* Existing Data Visualization */}
        <div className="analytics-section">
          <h2>Data Overview</h2>
          <DataVisualization data={filteredMovies} />
        </div>

        {/* Rating Distribution Histogram */}
        <div className="analytics-section">
          <h2>Rating Distribution Analysis</h2>
          <RatingDistributionHistogram data={filteredMovies} />
        </div>

        {/* Movies Rated Over Time */}
        <div className="analytics-section">
          <h2>Movies Rated Per Month/Year</h2>
          <MoviesRatedOverTime data={filteredMovies} />
        </div>

        {/* Your Ratings vs. IMDB Ratings */}
        <div className="analytics-section">
          <h2>Your Ratings vs. IMDB Ratings</h2>
          <YourVsImdbRatingsScatterPlot data={filteredMovies} />
        </div>

        {/* Average Rating Per Genre */}
        <div className="analytics-section">
          <h2>Average Rating Per Genre</h2>
          <AverageRatingPerGenre data={filteredMovies} />
        </div>
      </div>
    </div>
  );
};

Analytics.propTypes = AnalyticsProps;

export default Analytics;