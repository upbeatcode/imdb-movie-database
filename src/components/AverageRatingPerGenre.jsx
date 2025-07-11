import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import PropTypes from 'prop-types';

// Custom Tooltip Content
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload; // The data object for the hovered bar
    return (
      <div className="recharts-default-tooltip" style={{ backgroundColor: '#1e1e1e', border: '1px solid #444', padding: '10px', color: 'white' }}>
        <p className="recharts-tooltip-label" style={{ marginBottom: '5px' }}>{`Genre: ${label}`}</p>
        <p className="recharts-tooltip-item" style={{ color: payload[0].color }}>{`Average Rating: ${payload[0].value}`}</p>
        <p className="recharts-tooltip-item" style={{ color: payload[0].color }}>{`Movies Rated: ${dataPoint.count}`}</p>
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
};


const AverageRatingPerGenre = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available for this visualization.</p>;
  }

  const genreRatings = data.reduce((acc, movie) => {
    if (movie.genres && Array.isArray(movie.genres) && typeof movie.myRating === 'number') {
      movie.genres.forEach(genre => {
        if (!acc[genre]) {
          acc[genre] = { totalRating: 0, count: 0 };
        }
        acc[genre].totalRating += movie.myRating;
        acc[genre].count += 1;
      });
    }
    return acc;
  }, {});

  const chartData = Object.entries(genreRatings)
    .map(([genre, { totalRating, count }]) => ({
      genre,
      averageRating: count > 0 ? parseFloat((totalRating / count).toFixed(2)) : 0,
      count, // Pass count through for the filter
    }))
    .filter(item => item.count > 0) // Ensure we only show genres with rated movies
    .sort((a, b) => b.averageRating - a.averageRating); // Sort by average rating descending

  if (chartData.length === 0) {
    return <p>No genre data with ratings found.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 25, // Increased for X-axis label
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="genre">
          <Label value="Genre" offset={-20} position="insideBottom" />
        </XAxis>
        <YAxis domain={[0, 10]}>
          <Label value="Average Your Rating" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
        </YAxis>
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36}/>
        <Bar dataKey="averageRating" name="Average Your Rating" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

AverageRatingPerGenre.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    genres: PropTypes.arrayOf(PropTypes.string),
    myRating: PropTypes.number,
  })).isRequired,
};

export default AverageRatingPerGenre;
