import { data } from './assets/data.js';
import { useState } from 'react';

import {
  GenreTabsProps,
  DecadeTabsProps,
  YearTabsProps,
  RatingTabsProps,
  DateRatedTabsProps} from './componentProps';

import {
  getUniqueGenres,
  getUniqueDecades,
  // getUniqueYears,
  getUniqueRatings,
  getUniqueDateRatedYears,
  // generateFilterHeader
} from './utilities.js';

export function GenreTabs({ currentGenre, onSelect }) {
  const genres = getUniqueGenres(data);

  return (
    <div className="tabs">
      <button
        className={!currentGenre ? 'active' : ''}
        onClick={() => onSelect(null)} // Clear genre filter
      >
        All Genres
      </button>
      {genres.map((genre) => (
        <button
          key={genre}
          className={currentGenre === genre ? 'active' : ''}
          onClick={() => onSelect(genre)} // Select genre filter
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

GenreTabs.propTypes = GenreTabsProps;

export function DecadeTabs({ currentDecade, onSelect }) {
  const decades = getUniqueDecades(data);

  return (
    <div className="tabs">
      <button
        className={!currentDecade ? 'active' : ''}
        onClick={() => onSelect(null)} // Clear decade filter
      >
        All Decades
      </button>
      {decades.map((decade) => (
        <button
          key={decade}
          className={currentDecade === decade ? 'active' : ''}
          onClick={() => onSelect(decade)} // Select decade filter
        >
          {decade}
        </button>
      ))}
    </div>
  );
}

DecadeTabs.propTypes = DecadeTabsProps;

export const YearTabs = ({ currentYear, onSelect }) => {
  const [expandedDecade, setExpandedDecade] = useState(null);
  
  // Get unique years from data
  const uniqueYears = [...new Set(data.map(movie => movie.year))];
  
  // Group years by decade
  const yearsByDecade = {};
  uniqueYears.forEach(year => {
    const decade = `${Math.floor(year / 10) * 10}s`;
    if (!yearsByDecade[decade]) {
      yearsByDecade[decade] = [];
    }
    yearsByDecade[decade].push(year);
  });

  // Sort decades and years within each decade
  const sortedDecades = Object.keys(yearsByDecade).sort((a, b) => {
    const yearA = parseInt(a.replace('s', ''));
    const yearB = parseInt(b.replace('s', ''));
    return yearB - yearA; // Newest first
  });

  sortedDecades.forEach(decade => {
    yearsByDecade[decade].sort((a, b) => b - a); // Newest first within decade
  });

  const handleDecadeClick = (decade) => {
    if (expandedDecade === decade) {
      setExpandedDecade(null);
    } else {
      setExpandedDecade(decade);
    }
  };

  const handleYearClick = (year) => {
    onSelect(year);
    setExpandedDecade(null); // Collapse after selection
  };

  return (
    <div className="filter-options">
      <button
        className={`filter-option ${!currentYear ? 'active' : ''}`}
        onClick={() => onSelect(null)}
      >
        All Years
      </button>
      
      {/* Desktop view - all years */}
      <div className="desktop-year-tabs">
        {uniqueYears
          .sort((a, b) => b - a)
          .map((year) => (
            <button
              key={year}
              className={`filter-option ${currentYear === year ? 'active' : ''}`}
              onClick={() => onSelect(year)}
            >
              {year}
            </button>
          ))}
      </div>
      
      {/* Mobile view - decade grouping */}
      <div className="mobile-year-tabs">
        {sortedDecades.map((decade) => (
          <div key={decade} className="decade-group">
            <button
              className={`decade-button ${expandedDecade === decade ? 'expanded' : ''}`}
              onClick={() => handleDecadeClick(decade)}
            >
              {decade} {expandedDecade === decade ? '−' : '+'}
              <span className="year-count">({yearsByDecade[decade].length})</span>
            </button>
            
            {expandedDecade === decade && (
              <div className="decade-years">
                {yearsByDecade[decade].map((year) => (
                  <button
                    key={year}
                    className={`year-option ${currentYear === year ? 'active' : ''}`}
                    onClick={() => handleYearClick(year)}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

YearTabs.propTypes = YearTabsProps;

export function RatingTabs({ currentRating, onSelect }) {
  const ratings = getUniqueRatings(data);

  return (
    <div className="tabs">
      <button
        className={!currentRating ? 'active' : ''}
        onClick={() => onSelect(null)} // Clear rating filter
      >
        All Ratings
      </button>
      {ratings.map((rating) => (
        <button
          key={rating}
          className={currentRating === rating ? 'active' : ''} // Fix: Compare with number instead of string
          onClick={() => onSelect(rating)} // Select rating filter
        >
          {rating}
        </button>
      ))}
    </div>
  );
}

RatingTabs.propTypes = RatingTabsProps;

export function DateRatedTabs({ currentDateRatedYear, onSelect }) {
  const dateRatedYears = getUniqueDateRatedYears(data);

  return (
    <div className="tabs">
      <button
        className={!currentDateRatedYear ? 'active' : ''}
        onClick={() => onSelect(null)} // Clear date rated filter
      >
        All Years
      </button>
      {dateRatedYears.map((year) => (
        <button
          key={year}
          className={currentDateRatedYear === year ? 'active' : ''} // Fix: Compare with number instead of string
          onClick={() => onSelect(year)} // Select date rated filter
        >
          {year}
        </button>
      ))}
    </div>
  );
}

DateRatedTabs.propTypes = DateRatedTabsProps;