import axios from 'axios';

export const fetchFromTMDB = async (path, params = {}) => {
  const response = await axios.get(`http://localhost:5000/api/tmdb`, {
    params: {
      path,
      ...params,
    },
  });
  return response?.data;
};
