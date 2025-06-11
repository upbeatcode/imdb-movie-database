import { useState } from 'react';
import { MovieTableProps } from './componentProps';
import './App.css';
// import {data} from './assets/data.js';
import { formatRuntime, formatNumber, formatDate } from './utilities.js';


const MovieTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const moviesPerPage = 25;

  // Calculate pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const totalPages = Math.ceil(data.length / moviesPerPage);

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.key === 'dataRated' || sortConfig.key === 'releaseDate') {
      return sortConfig.direction === 'asc'
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    }

    if (typeof aValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });

  // Get current movies for pagination
  const currentMovies = sortedData.slice(indexOfFirstMovie, indexOfLastMovie);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <>
      <div className="table-container">
        <table className="movie-table">
          <thead>
            <tr>
              <th style={{ width: '25%' }} onClick={() => handleSort('title')}>
                Title{getSortIndicator('title')}
              </th>
              <th style={{ width: '5%' }} onClick={() => handleSort('year')}>
                Year{getSortIndicator('year')}
              </th>
              <th style={{ width: '15%' }}>Genres</th>
              <th style={{ width: '10%' }} onClick={() => handleSort('runtime')}>
                Runtime{getSortIndicator('runtime')}
              </th>
              <th
                style={{ width: '5%' }}
                onClick={() => handleSort('imdbRating')}
              >
                IMDb Rating{getSortIndicator('imdbRating')}
              </th>
              <th style={{ width: '5%' }} onClick={() => handleSort('myRating')}>
                My Rating{getSortIndicator('myRating')}
              </th>
              <th
                style={{ width: '10%' }}
                onClick={() => handleSort('dataRated')}
              >
                Date Rated{getSortIndicator('dataRated')}
              </th>
              <th style={{ width: '10%' }} onClick={() => handleSort('numVotes')}>
                Number of Votes{getSortIndicator('numVotes')}
              </th>
              <th
                style={{ width: '15%' }}
                onClick={() => handleSort('releaseDate')}
              >
                Release Date{getSortIndicator('releaseDate')}
              </th>
              {/* <th>Directors</th> */}
            </tr>
          </thead>
          <tbody>
            {currentMovies.map((movie) => (
              <tr key={movie.id} onClick={() => setSelectedMovie(movie)} style={{ cursor: 'pointer' }}>
                <td>{movie.title}</td>
                <td>{movie.year}</td>
                <td>{movie.genres.join(', ')}</td>
                <td>{formatRuntime(movie.runtime)}</td>
                <td>{movie.imdbRating}</td>
                <td>{movie.myRating}</td>
                <td>{movie.dataRated}</td>
                <td>{formatNumber(movie.numVotes)}</td>
                <td>{formatDate(movie.releaseDate)}</td>
                {/* <td>{movie.directors.join(', ')}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="pagination-info">{currentPage} of {totalPages}</span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="pagination-button"
        >
          Next
        </button>
      </div>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <div className="movie-modal">
          <div className="movie-modal-content">
            <button className="close-button" onClick={() => setSelectedMovie(null)}>×</button>
            <h2>{selectedMovie.title} ({selectedMovie.year})</h2>
            <div className="movie-details">
              <p><strong>Genres:</strong> {selectedMovie.genres.join(', ')}</p>
              <p><strong>Runtime:</strong> {formatRuntime(selectedMovie.runtime)}</p>
              <p><strong>IMDb Rating:</strong> {selectedMovie.imdbRating}</p>
              <p><strong>My Rating:</strong> {selectedMovie.myRating}</p>
              <p><strong>Date Rated:</strong> {selectedMovie.dataRated}</p>
              <p><strong>Release Date:</strong> {formatDate(selectedMovie.releaseDate)}</p>
              <p><strong>Votes:</strong> {formatNumber(selectedMovie.numVotes)}</p>
              {selectedMovie.directors && (
                <p><strong>Directors:</strong> {selectedMovie.directors.join(', ')}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

MovieTable.propTypes = MovieTableProps;

export default MovieTable;
