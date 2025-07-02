import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const RatingDistributionHistogram = ({ data }) => {
  const [binSize, setBinSize] = useState(0.5);

  // Calculate histogram data and statistics
  const histogramData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const ratings = data.map(movie => movie.myRating);
    
    // Calculate basic statistics
    const mean = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    const variance = ratings.reduce((sum, rating) => sum + Math.pow(rating - mean, 2), 0) / ratings.length;
    const stdDev = Math.sqrt(variance);

    // Create bins
    const minRating = 0;
    const maxRating = 10;
    const numBins = Math.ceil((maxRating - minRating) / binSize);
    
    const bins = Array(numBins).fill(0);
    const binLabels = [];
    
    // Generate bin labels and count frequencies
    for (let i = 0; i < numBins; i++) {
      const binStart = minRating + i * binSize;
      const binEnd = binStart + binSize;
      binLabels.push(`${binStart.toFixed(1)}-${binEnd.toFixed(1)}`);
      
      // Count ratings in this bin
      bins[i] = ratings.filter(rating => 
        rating >= binStart && (i === numBins - 1 ? rating <= binEnd : rating < binEnd)
      ).length;
    }

    // Calculate normal curve values
    const normalCurve = binLabels.map((label, index) => {
      const binCenter = minRating + (index + 0.5) * binSize;
      const normalValue = (data.length * binSize) * (1 / (stdDev * Math.sqrt(2 * Math.PI))) * 
        Math.exp(-0.5 * Math.pow((binCenter - mean) / stdDev, 2));
      return normalValue;
    });

    // Combine data for chart
    return binLabels.map((label, index) => ({
      bin: label,
      binCenter: minRating + (index + 0.5) * binSize,
      frequency: bins[index],
      normalCurve: normalCurve[index],
      percentage: ((bins[index] / data.length) * 100).toFixed(1)
    }));
  }, [data, binSize]);

  // Calculate insights
  const insights = useMemo(() => {
    if (!data || data.length === 0) return null;

    const ratings = data.map(movie => movie.myRating);
    const mean = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    const median = [...ratings].sort((a, b) => a - b)[Math.floor(ratings.length / 2)];
    
    // Calculate skewness (simplified)
    const variance = ratings.reduce((sum, rating) => sum + Math.pow(rating - mean, 2), 0) / ratings.length;
    const stdDev = Math.sqrt(variance);
    const skewness = ratings.reduce((sum, rating) => sum + Math.pow((rating - mean) / stdDev, 3), 0) / ratings.length;
    
    // Determine rating tendency
    let tendency = 'Balanced';
    let tendencyColor = '#28a745';
    
    if (mean < 5.5) {
      tendency = 'Harsh Critic';
      tendencyColor = '#dc3545';
    } else if (mean > 7.5) {
      tendency = 'Generous Rater';
      tendencyColor = '#007bff';
    }
    
    // Skewness interpretation
    let skewnessText = 'Normal distribution';
    if (skewness > 0.5) {
      skewnessText = 'Tends toward lower ratings';
    } else if (skewness < -0.5) {
      skewnessText = 'Tends toward higher ratings';
    }

    return {
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      stdDev: stdDev.toFixed(2),
      tendency,
      tendencyColor,
      skewnessText,
      totalMovies: ratings.length
    };
  }, [data]);

  // Custom tooltip with PropTypes validation
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`Rating Range: ${label}`}</p>
          <p className="tooltip-frequency">
            <span style={{ color: '#007bff' }}>
              {`Movies: ${data.frequency} (${data.percentage}%)`}
            </span>
          </p>
          <p className="tooltip-normal">
            <span style={{ color: '#28a745' }}>
              {`Normal Curve: ${data.normalCurve.toFixed(1)}`}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  // PropTypes for CustomTooltip component
  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    label: PropTypes.string,
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        payload: PropTypes.shape({
          bin: PropTypes.string,
          binCenter: PropTypes.number,
          frequency: PropTypes.number,
          normalCurve: PropTypes.number,
          percentage: PropTypes.string
        })
      })
    )
  };

  if (!data || data.length === 0) {
    return (
      <div className="no-data">
        <p>No rating data available for histogram analysis</p>
      </div>
    );
  }

  return (
    <div className="rating-histogram-container">
      {/* Controls */}
      <div className="histogram-controls">
        <div className="bin-size-control">
          <label htmlFor="binSize">Bin Size:</label>
          <select
            id="binSize"
            value={binSize}
            onChange={(e) => setBinSize(parseFloat(e.target.value))}
            className="bin-size-select"
          >
            <option value={0.25}>0.25 (Fine)</option>
            <option value={0.5}>0.5 (Normal)</option>
            <option value={1.0}>1.0 (Coarse)</option>
          </select>
        </div>
      </div>

      {/* Insights Panel */}
      {insights && (
        <div className="insights-panel">
          <div className="insight-card">
            <h4>Rating Analysis</h4>
            <div className="insight-stats">
              <div className="stat-item">
                <span className="stat-label">Average Rating:</span>
                <span className="stat-value">{insights.mean}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Median Rating:</span>
                <span className="stat-value">{insights.median}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Standard Deviation:</span>
                <span className="stat-value">{insights.stdDev}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Rating Style:</span>
                <span 
                  className="stat-value" 
                  style={{ color: insights.tendencyColor, fontWeight: 'bold' }}
                >
                  {insights.tendency}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Distribution:</span>
                <span className="stat-value">{insights.skewnessText}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="histogram-chart">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={histogramData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis 
              dataKey="bin" 
              stroke="#ddd"
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
            />
            <YAxis stroke="#ddd" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {/* Histogram bars */}
            <Bar 
              dataKey="frequency" 
              fill="#007bff" 
              fillOpacity={0.7}
              name="Movie Count"
              stroke="#0056b3"
              strokeWidth={1}
            />
            
            {/* Normal curve overlay */}
            <Line 
              type="monotone" 
              dataKey="normalCurve" 
              stroke="#28a745" 
              strokeWidth={3}
              name="Normal Distribution"
              dot={false}
              strokeDasharray="5 5"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Description */}
      <div className="chart-description">
        <p>
          <strong>How to interpret:</strong> The blue bars show your actual rating distribution, 
          while the green dashed line shows a normal distribution curve. If your ratings cluster 
          around lower values, you might be a harsh critic. If they cluster around higher values, 
          you might be more generous. A distribution that closely follows the normal curve suggests 
          balanced rating patterns.
        </p>
      </div>
    </div>
  );
};

// Complete PropTypes validation
RatingDistributionHistogram.propTypes = {
  // Main data prop - array of movie objects
  data: PropTypes.arrayOf(
    PropTypes.shape({
      // Required: The user's rating (must be a number between 0-10)
      myRating: PropTypes.number.isRequired,
      
      // Required: Movie title for identification
      title: PropTypes.string.isRequired,
      
      // Optional: Additional movie properties that might be used elsewhere
      // Include these if your data might contain them for future extensibility
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      year: PropTypes.number,
      genre: PropTypes.string,
      director: PropTypes.string,
      imdbRating: PropTypes.number,
      runtime: PropTypes.number,
      plot: PropTypes.string,
      poster: PropTypes.string,
      
      // Optional: Date when the rating was given
      dateRated: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
      ]),
      
      // Optional: User's review text
      review: PropTypes.string,
      
      // Optional: Whether the movie is favorited
      isFavorite: PropTypes.bool,
      
      // Optional: Custom tags or categories
      tags: PropTypes.arrayOf(PropTypes.string),
      
      // Optional: Rewatch indicator
      isRewatch: PropTypes.bool
    })
  ).isRequired
};

// Default props (optional but recommended)
RatingDistributionHistogram.defaultProps = {
  data: []
};

export default RatingDistributionHistogram;