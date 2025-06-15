import PropTypes from 'prop-types';

// Update these prop types in componentProps.js
export const GenreTabsProps = {
  currentGenre: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

export const DecadeTabsProps = {
  currentDecade: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

export const YearTabsProps = {
  currentYear: PropTypes.number,
  onSelect: PropTypes.func.isRequired
};

export const RatingTabsProps = {
  currentRating: PropTypes.number,
  onSelect: PropTypes.func.isRequired
};

export const DateRatedTabsProps = {
  currentDateRatedYear: PropTypes.number,
  onSelect: PropTypes.func.isRequired
};

// Update the activeFilters shape in HomePageProps
export const HomePageProps = {
  activeFilter: PropTypes.string.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
  filterMode: PropTypes.string.isRequired,
  setFilterMode: PropTypes.func.isRequired,
  activeFilters: PropTypes.shape({
    genre: PropTypes.string,
    decade: PropTypes.string,
    year: PropTypes.number,
    rating: PropTypes.number,
    dateRatedYear: PropTypes.number
  }).isRequired,
  updateActiveFilters: PropTypes.func.isRequired,
  filterMovies: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired
};

export const YearPageProps = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      myRating: PropTypes.number,
      dataRated: PropTypes.string,
      title: PropTypes.string,
      imdbRating: PropTypes.number,
      runtime: PropTypes.number,
      year: PropTypes.number,
      genres: PropTypes.arrayOf(PropTypes.string),
      numVotes: PropTypes.number,
      releaseDate: PropTypes.string,
      directors: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};

export const GenrePageProps = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      myRating: PropTypes.number,
      dataRated: PropTypes.string,
      title: PropTypes.string,
      imdbRating: PropTypes.number,
      runtime: PropTypes.number,
      year: PropTypes.number,
      genres: PropTypes.arrayOf(PropTypes.string),
      numVotes: PropTypes.number,
      releaseDate: PropTypes.string,
      directors: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};

export const DecadePageProps = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      myRating: PropTypes.number,
      dataRated: PropTypes.string,
      title: PropTypes.string,
      imdbRating: PropTypes.number,
      runtime: PropTypes.number,
      year: PropTypes.number,
      genres: PropTypes.arrayOf(PropTypes.string),
      numVotes: PropTypes.number,
      releaseDate: PropTypes.string,
      directors: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};

export const RatingPageProps = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      myRating: PropTypes.number,
      dataRated: PropTypes.string,
      title: PropTypes.string,
      imdbRating: PropTypes.number,
      runtime: PropTypes.number,
      year: PropTypes.number,
      genres: PropTypes.arrayOf(PropTypes.string),
      numVotes: PropTypes.number,
      releaseDate: PropTypes.string,
      directors: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};

export const DateRatedPageProps = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      myRating: PropTypes.number,
      dataRated: PropTypes.string,
      title: PropTypes.string,
      imdbRating: PropTypes.number,
      runtime: PropTypes.number,
      year: PropTypes.number,
      genres: PropTypes.arrayOf(PropTypes.string),
      numVotes: PropTypes.number,
      releaseDate: PropTypes.string,
      directors: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};

export const DataVisualizationProps = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      myRating: PropTypes.number,
      dataRated: PropTypes.string,
      title: PropTypes.string,
      imdbRating: PropTypes.number,
      runtime: PropTypes.number,
      year: PropTypes.number,
      genres: PropTypes.arrayOf(PropTypes.string),
      numVotes: PropTypes.number,
      releaseDate: PropTypes.string,
      directors: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};

export const MovieTableProps = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      myRating: PropTypes.number.isRequired,
      dataRated: PropTypes.string,
      title: PropTypes.string.isRequired,
      imdbRating: PropTypes.number.isRequired,
      runtime: PropTypes.number.isRequired,
      year: PropTypes.number.isRequired,
      genres: PropTypes.arrayOf(PropTypes.string).isRequired,
      numVotes: PropTypes.number.isRequired,
      releaseDate: PropTypes.string.isRequired,
      directors: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};

export const AnalyticsProps = {
  activeFilters: PropTypes.shape({
    genre: PropTypes.string,
    decade: PropTypes.string,
    year: PropTypes.number,
    rating: PropTypes.number,
    dateRatedYear: PropTypes.number
  }).isRequired,
  filterMovies: PropTypes.func.isRequired,
  updateActiveFilters: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired
};