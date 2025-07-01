import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import PropTypes from 'prop-types';

const YourVsImdbRatingsScatterPlot = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available for this visualization.</p>;
  }

  const chartData = data.map(movie => ({
    x: movie.imdbRating,
    y: movie.myRating,
    title: movie.title,
    year: movie.year,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 40, // Increased bottom margin for X-axis label
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="IMDB Rating" unit="" domain={[0, 10]}>
          <Label value="IMDB Rating" offset={-25} position="insideBottom" />
        </XAxis>
        <YAxis type="number" dataKey="y" name="Your Rating" unit="" domain={[0, 10]}>
          <Label value="Your Rating" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
        </YAxis>
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const point = payload[0].payload;
              return (
                <div className="custom-tooltip" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                  <p style={{ color: '#333', fontWeight: 'bold' }}>{`${point.title} (${point.year})`}</p>
                  <p style={{ color: '#666' }}>{`IMDB: ${point.x}`}</p>
                  <p style={{ color: '#666' }}>{`You: ${point.y}`}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Scatter name="Movies" data={chartData} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

YourVsImdbRatingsScatterPlot.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    imdbRating: PropTypes.number,
    myRating: PropTypes.number,
    title: PropTypes.string,
    year: PropTypes.number,
  })).isRequired,
};

export default YourVsImdbRatingsScatterPlot;
