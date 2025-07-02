import {
  GenrePageProps,
  DecadePageProps,
  YearPageProps,
  RatingPageProps,
  DateRatedPageProps
} from './componentProps';

import { data } from './assets/data.js';
import MovieTable from './MovieTable';

import {
  useParams
} from 'react-router-dom';

export function GenrePage() {
  const { genre } = useParams();
  const filteredMovies = data.filter((movie) => movie.genres.includes(genre));

  return (
    <div>
      <h1>
        {genre} Movies ({filteredMovies.length})
      </h1>
      <MovieTable data={filteredMovies} />
    </div>
  );
}

GenrePage.propTypes = GenrePageProps;

export function DecadePage() {
  const { decade } = useParams();
  const filteredMovies = data.filter((movie) => {
    const movieDecade = Math.floor(movie.year / 10) * 10;
    return `${movieDecade}s` === decade;
  });

  return (
    <div>
      <h1>
        {decade} Movies ({filteredMovies.length})
      </h1>
      <MovieTable data={filteredMovies} />
    </div>
  );
}

DecadePage.propTypes = DecadePageProps;

export function YearPage() {
  const { year } = useParams();
  const yearNum = parseInt(year);
  const filteredMovies = data.filter((movie) => movie.year === yearNum);

  return (
    <div>
      <h1>
        {year} Movies ({filteredMovies.length})
      </h1>
      <MovieTable data={filteredMovies} />
    </div>
  );
}

YearPage.propTypes = YearPageProps;

export function RatingPage() {
  const { rating } = useParams();
  const ratingNum = parseFloat(rating);
  const filteredMovies = data.filter((movie) => movie.myRating === ratingNum);

  return (
    <div>
      <h1>
        Movies Rated {rating} ({filteredMovies.length})
      </h1>
      <MovieTable data={filteredMovies} />
    </div>
  );
}

RatingPage.propTypes = RatingPageProps;

export function DateRatedPage() {
  const { year } = useParams();
  const yearNum = parseInt(year);
  const filteredMovies = data.filter((movie) => {
    // Use dateRated consistently
    if (movie.dateRated) {
      try {
        const ratedYear = new Date(movie.dateRated).getFullYear();
        return !isNaN(ratedYear) && ratedYear === yearNum;
      } catch (error) {
        console.error('Invalid date format:', movie.dateRated);
        console.error(error);
        // If the date format is invalid, we skip this movie
        return false;
      }
    }
    return false;
  });

  return (
    <div>
      <h1>
        Movies Rated in {year} ({filteredMovies.length})
      </h1>
      <MovieTable data={filteredMovies} />
    </div>
  );
}

DateRatedPage.propTypes = DateRatedPageProps;