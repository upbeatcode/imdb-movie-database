// Update src/DataVisualization.jsx
import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import ChartModal from './ChartModal';

const DataVisualization = ({ data }) => {
  const [activeChart, setActiveChart] = useState('ratings');
  const [showModal, setShowModal] = useState(false);
  const [modalChart, setModalChart] = useState('ratings');

  // Chart configuration
  const chartTypes = [
    { key: 'ratings', label: 'Ratings Distribution' },
    { key: 'genres', label: 'Genre Distribution' },
    { key: 'decades', label: 'Movies by Decade' },
    { key: 'years', label: 'Movies by Year' },
    { key: 'timeline', label: 'Rating Timeline' }
  ];

  // Handle mobile chart selection
  const handleMobileChartSelect = (chartType) => {
    setModalChart(chartType);
    setShowModal(true);
  };

  // Handle desktop chart selection
  const handleDesktopChartSelect = (chartType) => {
    setActiveChart(chartType);
  };

  // Data processing functions
  const getRatingsData = () => {
    const ratings = {};
    data.forEach(movie => {
      const rating = movie.myRating;
      ratings[rating] = (ratings[rating] || 0) + 1;
    });
    return Object.entries(ratings)
      .map(([rating, count]) => ({ rating: parseFloat(rating), count }))
      .sort((a, b) => a.rating - b.rating);
  };

  const getGenresData = () => {
    const genres = {};
    data.forEach(movie => {
      movie.genres.forEach(genre => {
        genres[genre] = (genres[genre] || 0) + 1;
      });
    });
    return Object.entries(genres)
      .map(([genre, count]) => ({ genre, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  const getDecadesData = () => {
    const decades = {};
    data.forEach(movie => {
      const decade = `${Math.floor(movie.year / 10) * 10}s`;
      decades[decade] = (decades[decade] || 0) + 1;
    });
    return Object.entries(decades)
      .map(([decade, count]) => ({ decade, count }))
      .sort((a, b) => parseInt(a.decade) - parseInt(b.decade));
  };

  const getYearsData = () => {
    const years = {};
    data.forEach(movie => {
      years[movie.year] = (years[movie.year] || 0) + 1;
    });
    return Object.entries(years)
      .map(([year, count]) => ({ year: parseInt(year), count }))
      .sort((a, b) => a.year - b.year);
  };

  const getTimelineData = () => {
    return data
      .filter(movie => movie.dataRated)
      .map(movie => ({
        date: new Date(movie.dataRated).toLocaleDateString(),
        rating: movie.myRating,
        title: movie.title
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Chart rendering function
  const renderChart = (chartType, chartData) => {
    const colors = ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1', '#20c997', '#fd7e14', '#e83e8c'];

    switch (chartType) {
      case 'ratings': {
        const ratingsData = getRatingsData();
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ratingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        );
      }

      case 'genres': {
        const genresData = getGenresData();
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genresData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ genre, percent }) => `${genre} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {genresData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      }

      case 'decades': {
        const decadesData = getDecadesData();
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={decadesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="decade" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#28a745" />
            </BarChart>
          </ResponsiveContainer>
        );
      }

      case 'years': {
        const yearsData = getYearsData();
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={yearsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#ffc107" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      }

      case 'timeline': {
        const timelineData = getTimelineData();
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line type="monotone" dataKey="rating" stroke="#dc3545" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      }

      default:
        return null;
    }
  };

  if (!data || data.length === 0) {
    return <div className="no-data">No data available for visualization</div>;
  }

  return (
    <div className="data-visualization">
      {/* Desktop View */}
      <div className="desktop-view">
        <div className="chart-selector">
          {chartTypes.map(chart => (
            <button
              key={chart.key}
              className={activeChart === chart.key ? 'active' : ''}
              onClick={() => handleDesktopChartSelect(chart.key)}
            >
              {chart.label}
            </button>
          ))}
        </div>
        <div className="chart-container">
          {renderChart(activeChart, data)}
        </div>
      </div>

      {/* Mobile View */}
      <div className="mobile-view">
        <div className="chart-selector mobile-chart-selector">
          {chartTypes.map(chart => (
            <button
              key={chart.key}
              onClick={() => handleMobileChartSelect(chart.key)}
              className="mobile-chart-button"
            >
              {chart.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Modal for Mobile */}
      <ChartModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        chartTypes={chartTypes}
        initialChart={modalChart}
        renderChart={renderChart}
        data={data}
      />
    </div>
  );
};

export default DataVisualization;