import { data } from './assets/data.js';

import {
  GenreTabsProps,
  DecadeTabsProps,
  YearTabsProps,
  RatingTabsProps,
  DateRatedTabsProps} from './componentProps';

import {
  getUniqueGenres,
  getUniqueDecades,
  getUniqueYears,
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

export function YearTabs({ currentYear, onSelect }) {
  const years = getUniqueYears(data);

  return (
    <div className="tabs">
      <button
        className={!currentYear ? 'active' : ''}
        onClick={() => onSelect(null)} // Clear year filter
      >
        All Years
      </button>
      {years.map((year) => (
        <button
          key={year}
          className={currentYear === year ? 'active' : ''} // Fix: Compare with number instead of string
          onClick={() => onSelect(year)} // Select year filter
        >
          {year}
        </button>
      ))}
    </div>
  );
}

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