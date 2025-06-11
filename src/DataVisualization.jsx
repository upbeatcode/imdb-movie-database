import { useState } from 'react';
import { DataVisualizationProps } from './componentProps';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import './App.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'];

const DataVisualization = ({ data }) => {
  const [activeChart, setActiveChart] = useState('ratings');

  // Prepare data for ratings distribution chart
  const prepareRatingsData = () => {
    const ratingsCount = {};
    data.forEach(movie => {
      const rating = movie.myRating;
      ratingsCount[rating] = (ratingsCount[rating] || 0) + 1;
    });

    return Object.keys(ratingsCount)
      .map(rating => ({
        rating: `${rating}★`,
        count: ratingsCount[rating]
      }))
      .sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
  };

  // Prepare data for decades chart
  const prepareDecadesData = () => {
    const decadesCount = {};
    data.forEach(movie => {
      const decade = Math.floor(movie.year / 10) * 10;
      const decadeLabel = `${decade}s`;
      decadesCount[decadeLabel] = (decadesCount[decadeLabel] || 0) + 1;
    });

    return Object.keys(decadesCount)
      .map(decade => ({
        decade,
        count: decadesCount[decade]
      }))
      .sort((a, b) => {
        const decadeA = parseInt(a.decade);
        const decadeB = parseInt(b.decade);
        return decadeA - decadeB;
      });
  };

  // Prepare data for genres chart
  const prepareGenresData = () => {
    const genresCount = {};
    data.forEach(movie => {
      movie.genres.forEach(genre => {
        genresCount[genre] = (genresCount[genre] || 0) + 1;
      });
    });

    return Object.keys(genresCount)
      .map(genre => ({
        genre,
        count: genresCount[genre]
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Show top 10 genres
  };

  // Prepare data for IMDb vs My Ratings chart
  const prepareRatingsComparisonData = () => {
    // Group by my rating and calculate average IMDb rating for each group
    const ratingGroups = {};
    data.forEach(movie => {
      const myRating = movie.myRating;
      if (!ratingGroups[myRating]) {
        ratingGroups[myRating] = {
          totalImdbRating: 0,
          count: 0
        };
      }
      ratingGroups[myRating].totalImdbRating += movie.imdbRating;
      ratingGroups[myRating].count += 1;
    });

    return Object.keys(ratingGroups)
      .map(myRating => ({
        myRating: `${myRating}★`,
        averageImdbRating: parseFloat((ratingGroups[myRating].totalImdbRating / ratingGroups[myRating].count).toFixed(1)),
        count: ratingGroups[myRating].count
      }))
      .sort((a, b) => parseFloat(a.myRating) - parseFloat(b.myRating));
  };

  // Prepare data for movies watched by year chart
  const prepareWatchedByYearData = () => {
    const yearCounts = {};
    data.forEach(movie => {
      if (movie.dataRated) {
        try {
          const year = new Date(movie.dataRated).getFullYear();
          if (!isNaN(year)) {
            yearCounts[year] = (yearCounts[year] || 0) + 1;
          }
        } catch (error) {
          console.error("Invalid date format:", movie.dataRated);
          console.error(error);
        }
      }
    });

    return Object.keys(yearCounts)
      .map(year => ({
        year,
        count: yearCounts[year]
      }))
      .sort((a, b) => parseInt(a.year) - parseInt(b.year));
  };

  const renderRatingsDistributionChart = () => {
    const ratingsData = prepareRatingsData();
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={ratingsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rating" />
          <YAxis />
          <Tooltip formatter={(value) => [`${value} movies`, 'Count']} />
          <Legend />
          <Bar dataKey="count" name="Number of Movies" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderDecadesChart = () => {
    const decadesData = prepareDecadesData();
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={decadesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="decade" />
          <YAxis />
          <Tooltip formatter={(value) => [`${value} movies`, 'Count']} />
          <Legend />
          <Bar dataKey="count" name="Number of Movies" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderGenresChart = () => {
    const genresData = prepareGenresData();
    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={genresData}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={150}
            fill="#8884d8"
            dataKey="count"
            nameKey="genre"
            label={({ genre, count, percent }) => `${genre}: ${count} (${(percent * 100).toFixed(0)}%)`}
          >
            {genresData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name, props) => [`${value} movies`, props.payload.genre]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const renderRatingsComparisonChart = () => {
    const comparisonData = prepareRatingsComparisonData();
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="myRating" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="averageImdbRating" name="Average IMDb Rating" stroke="#FF8042" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="myRating" name="My Rating" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderWatchedByYearChart = () => {
    const watchedData = prepareWatchedByYearData();
    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={watchedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip formatter={(value) => [`${value} movies`, 'Movies Watched']} />
          <Legend />
          <Area type="monotone" dataKey="count" name="Movies Watched" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  const renderActiveChart = () => {
    switch (activeChart) {
      case 'ratings':
        return renderRatingsDistributionChart();
      case 'decades':
        return renderDecadesChart();
      case 'genres':
        return renderGenresChart();
      case 'comparison':
        return renderRatingsComparisonChart();
      case 'watched':
        return renderWatchedByYearChart();
      default:
        return renderRatingsDistributionChart();
    }
  };

  return (
    <div className="data-visualization">
      <h2>Movie Data Visualization</h2>
      <div className="chart-selector">
        <button 
          className={activeChart === 'ratings' ? 'active' : ''}
          onClick={() => setActiveChart('ratings')}
        >
          Ratings Distribution
        </button>
        <button 
          className={activeChart === 'decades' ? 'active' : ''}
          onClick={() => setActiveChart('decades')}
        >
          Movies by Decade
        </button>
        <button 
          className={activeChart === 'genres' ? 'active' : ''}
          onClick={() => setActiveChart('genres')}
        >
          Top Genres
        </button>
        <button 
          className={activeChart === 'comparison' ? 'active' : ''}
          onClick={() => setActiveChart('comparison')}
        >
          IMDb vs My Ratings
        </button>
        <button 
          className={activeChart === 'watched' ? 'active' : ''}
          onClick={() => setActiveChart('watched')}
        >
          Movies Watched by Year
        </button>
      </div>
      <div className="chart-container">
        {renderActiveChart()}
      </div>
    </div>
  );
};

DataVisualization.propTypes = DataVisualizationProps;

export default DataVisualization;

