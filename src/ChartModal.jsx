// src/components/ChartModal.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ChartModal = ({ 
  isOpen, 
  onClose, 
  chartTypes, 
  initialChart, 
  renderChart, 
  data 
}) => {
  const [currentChart, setCurrentChart] = useState(initialChart);
  
  useEffect(() => {
    if (isOpen) {
      setCurrentChart(initialChart);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialChart]);

  const handlePrevChart = () => {
    const currentIndex = chartTypes.findIndex(chart => chart.key === currentChart);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : chartTypes.length - 1;
    setCurrentChart(chartTypes[prevIndex].key);
  };

  const handleNextChart = () => {
    const currentIndex = chartTypes.findIndex(chart => chart.key === currentChart);
    const nextIndex = currentIndex < chartTypes.length - 1 ? currentIndex + 1 : 0;
    setCurrentChart(chartTypes[nextIndex].key);
  };

  const getCurrentChartTitle = () => {
    const chart = chartTypes.find(chart => chart.key === currentChart);
    return chart ? chart.label : '';
  };

  if (!isOpen) return null;

  return (
    <div className="chart-modal-overlay">
      <div className="chart-modal-content">
        {/* Header */}
        <div className="chart-modal-header">
          <h3>{getCurrentChartTitle()}</h3>
          <button 
            className="chart-modal-close" 
            onClick={onClose}
            aria-label="Close chart modal"
          >
            ×
          </button>
        </div>

        {/* Chart Container */}
        <div className="chart-modal-chart">
          {renderChart(currentChart, data)}
        </div>

        {/* Navigation */}
        <div className="chart-modal-navigation">
          <button 
            className="chart-nav-button prev" 
            onClick={handlePrevChart}
            aria-label="Previous chart"
          >
            ← Prev
          </button>
          
          <div className="chart-indicators">
            {chartTypes.map((chart) => (
              <button
                key={chart.key}
                className={`chart-indicator ${currentChart === chart.key ? 'active' : ''}`}
                onClick={() => setCurrentChart(chart.key)}
                aria-label={`View ${chart.label}`}
              />
            ))}
          </div>
          
          <button 
            className="chart-nav-button next" 
            onClick={handleNextChart}
            aria-label="Next chart"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};


// PropTypes validation
ChartModal.propTypes = {
  /** Whether the modal is open/visible */
  isOpen: PropTypes.bool.isRequired,
  
  /** Function called when modal should be closed */
  onClose: PropTypes.func.isRequired,
  
  /** Array of chart type objects with key and label properties */
  chartTypes: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  
  /** The initial chart type key to display when modal opens */
  initialChart: PropTypes.string.isRequired,
  
  /** Function that renders a chart given a chart type and data */
  renderChart: PropTypes.func.isRequired,
  
  /** Data array to be passed to the chart rendering function */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      year: PropTypes.number,
      myRating: PropTypes.number,
      genres: PropTypes.arrayOf(PropTypes.string),
      dataRated: PropTypes.string
    })
  ).isRequired
};

// Default props (optional)
ChartModal.defaultProps = {
  isOpen: false
};

export default ChartModal;