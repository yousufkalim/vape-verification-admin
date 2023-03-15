// Init
import axios from 'axios';
import { toast } from 'react-toastify';

const api = async (method = 'get', uri, body) => {
  // API Call
  const url = process.env.REACT_APP_SERVER_URL + uri;
  const token = localStorage.getItem('token');
  axios.defaults.headers = {
    Authorization: `Bearer ${token}`,
  };

  return new Promise((resolve, reject) => {
    axios[method](url, body)
      .then((res) => resolve(res.data))
      .catch((err) => {
        if (err?.response?.status === 403) {
          localStorage.setItem('token', '');
          window.location = '/auth/login';
        } else {
          console.log('API Error --------> ', err);
          toast.error(err?.response?.data?.message || err?.message);
          reject(err);
        }
      });
  });
};

// Export
export default api;
