import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import PropTypes from 'prop-types';

const MoviesRatedOverTime = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available for this visualization.</p>;
  }

  const countsByMonthYear = data.reduce((acc, movie) => {
    if (movie.dateRated) {
      const date = new Date(movie.dateRated);
      // Ensure date is valid
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() is 0-indexed
        const monthYear = `${year}-${String(month).padStart(2, '0')}`;
        acc[monthYear] = (acc[monthYear] || 0) + 1;
      }
    }
    return acc;
  }, {});

  const chartData = Object.entries(countsByMonthYear)
    .map(([monthYear, count]) => ({
      monthYear,
      count,
    }))
    .sort((a, b) => {
      const [yearA, monthA] = a.monthYear.split('-').map(Number);
      const [yearB, monthB] = b.monthYear.split('-').map(Number);
      if (yearA !== yearB) {
        return yearA - yearB;
      }
      return monthA - monthB;
    });

  if (chartData.length === 0) {
    return <p>No movies with valid rating dates found.</p>;
  }
  
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 25, // Increased bottom margin for X-axis label
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="monthYear">
         <Label value="Month Rated" offset={-20} position="insideBottom" />
        </XAxis>
        <YAxis allowDecimals={false}>
           <Label value="Number of Movies Rated" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
        </YAxis>
        <Tooltip />
        <Legend verticalAlign="top" height={36}/>
        <Line type="monotone" dataKey="count" name="Movies Rated" stroke="#82ca9d" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

MoviesRatedOverTime.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    dateRated: PropTypes.string, // Assuming dateRated is a string like "YYYY-MM-DD"
  })).isRequired,
};

export default MoviesRatedOverTime;
